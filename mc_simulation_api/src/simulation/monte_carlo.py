from decimal import Decimal
from typing import List
from numpy import isin
from tqdm import tqdm
from loguru import logger
from sympy.solvers import solve
from sympy import Symbol, Float
from sympy.core import Add

from src.constants import (DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS,
                           NUMBER_OF_SIMULATIONS)
from src.simulation import schemas
from src.simulation.distribution_sampling import get_random_sample_pairs

KEY_QUANTILE_VALUES = (0.05, 0.25, 0.5, 0.75, 0.95)


def format_as_currency(currency_amount: Decimal) -> str:
    return '${:,.2f}'.format(currency_amount)  # pylint: disable=consider-using-f-string


def calc_years_until_retirement(
        a_current_age: int, a_retirement_age: int) -> int:
    '''Calculate the number of years from the current age until the retirement age'''
    return a_retirement_age - a_current_age


def calc_years_from_retirement_until_life_expectancy(
        a_retirement_age: int, a_life_expectancy: int) -> int:
    '''Calculate the number of years from retirement age until the end of life expectancy'''
    return a_life_expectancy - a_retirement_age


def calc_simulation_duration(
        num_years_until_retirement: int,
        num_years_from_retirement_until_life_expectancy: int) -> int:
    '''Calculate the total duration of the simulation in years'''
    return num_years_until_retirement + num_years_from_retirement_until_life_expectancy


def calc_compound_interest(principal_amount: Decimal, interest_rate: Decimal,
                           num_time_periods_elapsed: int) -> Decimal:
    '''Calculate a final balance using the standard compound interest formula'''
    # We currently assume annual compounding though this could change in the future
    times_compounded_per_unit_of_time = 1
    exponent = times_compounded_per_unit_of_time * num_time_periods_elapsed
    interest_rate_plus_one = interest_rate + Decimal(1)
    compounded_interest_rate = pow(interest_rate_plus_one, exponent)
    final_amount = principal_amount * compounded_interest_rate
    return final_amount


def adjust_balance_by_mean_inflation(
        a_portfolio_balance: Decimal, a_mean_inflation_rate: Decimal) -> Decimal:
    '''Adjust a portfolio balance by a mean inflation rate'''
    discount_rate = 1 - a_mean_inflation_rate
    inflation_adjusted_balance = a_portfolio_balance * discount_rate
    return inflation_adjusted_balance


def adjust_pre_retirement_contribution_amount_for_income_growth(
        retirement_contribution_amount: Decimal,
        a_income_growth_mean: Decimal,
        years_since_simulation_began: int) -> Decimal:
    '''Adjust the pre-retirement contribution amount to account for income growth'''
    adjusted_contribution_amount = calc_compound_interest(
        principal_amount=retirement_contribution_amount,
        interest_rate=a_income_growth_mean,
        num_time_periods_elapsed=years_since_simulation_began)
    return adjusted_contribution_amount


def adjust_post_retirement_withdrawal_amount_for_inflation(
        retirement_withdrawal_amount: Decimal,
        a_inflation_mean: Decimal,
        years_since_simulation_began: int) -> Decimal:
    '''Adjust the post-retirement withdrawal amount to account for inflation'''
    adjusted_withdrawal_amount = calc_compound_interest(
        principal_amount=retirement_withdrawal_amount,
        interest_rate=a_inflation_mean,
        num_time_periods_elapsed=years_since_simulation_began)
    return adjusted_withdrawal_amount


def adjust_post_retirement_withdrawal_amount_for_taxes(
    retirement_withdrawal_amount: Decimal,
    a_post_retirement_tax_rate: Decimal
) -> Decimal:
    '''
    Adjust the post-retirement withdrawal amount to account for taxes.
    We assume that additional monies are withdrawn such that the user ends up with the same
    amount each year after-taxes as s/he would if there were not taxes applied
    '''
    post_retirement_tax_multiplier = 1 + a_post_retirement_tax_rate
    after_taxes_withdrawal_amount = retirement_withdrawal_amount * post_retirement_tax_multiplier
    additional_amount_to_cover_taxes = after_taxes_withdrawal_amount - retirement_withdrawal_amount
    withdrawal_amount_adjusted_for_taxes = retirement_withdrawal_amount \
        + additional_amount_to_cover_taxes
    return withdrawal_amount_adjusted_for_taxes


def calc_balances_from_current_age_to_retirement(
        a_initial_portfolio_amount: Decimal,
        a_pre_retirement_annual_rate_of_return: Decimal,
        num_years_until_retirement: int,
        a_pre_retirement_annual_contribution: Decimal,
        a_inflation_mean: Decimal,
        a_income_growth_mean: Decimal,
        should_adjust_contributions_for_income_growth: bool,
        should_adjust_portfolio_balance_for_inflation: bool,
        home_sale_net_proceeds: Decimal,
        years_in_future_of_home_purchase: int) -> Decimal:
    '''Calculate balance at retirement age'''
    balances_by_year = []
    pre_retirement_simulation_year = 1
    compounded_balance = a_initial_portfolio_amount
    # Loop over the num_years_until_retirement compounding our annual returns and contributions
    while pre_retirement_simulation_year <= num_years_until_retirement:
        annual_contribution = a_pre_retirement_annual_contribution
        if should_adjust_contributions_for_income_growth:
            annual_contribution = adjust_pre_retirement_contribution_amount_for_income_growth(
                a_income_growth_mean=a_income_growth_mean,
                retirement_contribution_amount=annual_contribution,
                years_since_simulation_began=pre_retirement_simulation_year)
        # TODO We currently assume half of the annual contribution is made prior to compounding and
        # half post compounding. This is
        # a simplification and should really be refactored to use a monthly compounding model
        half_of_annual_contribution = annual_contribution / 2
        compounded_balance += half_of_annual_contribution
        # only compound positive balances
        if isinstance(compounded_balance, Add):
            if compounded_balance.args[0].is_positive:
                compounded_balance = calc_compound_interest(
                    principal_amount=compounded_balance,
                    interest_rate=a_pre_retirement_annual_rate_of_return,
                    num_time_periods_elapsed=1)
        else:
            if compounded_balance > 0:
                compounded_balance = calc_compound_interest(
                    principal_amount=compounded_balance,
                    interest_rate=a_pre_retirement_annual_rate_of_return,
                    num_time_periods_elapsed=1)
        compounded_balance += half_of_annual_contribution
        if should_adjust_portfolio_balance_for_inflation:
            compounded_balance = adjust_balance_by_mean_inflation(
                a_portfolio_balance=compounded_balance,
                a_mean_inflation_rate=a_inflation_mean)
        if (pre_retirement_simulation_year == years_in_future_of_home_purchase + 1):
            compounded_balance += home_sale_net_proceeds
        balances_by_year.append(compounded_balance)
        pre_retirement_simulation_year += 1
    return compounded_balance, balances_by_year


def calc_balance_from_retirement_to_eol(
        a_balance_at_retirement: Decimal,
        a_post_retirement_annual_rate_of_return: Decimal,
        num_years_until_retirement: int,
        num_years_between_retirement_and_eol: int,
        a_post_retirement_annual_withdrawal: Decimal,
        a_post_retirement_annual_additional_income: Decimal,
        a_inflation_mean: Decimal,
        a_post_retirement_tax_rate: Decimal,
        should_adjust_withdrawals_for_inflation: bool,
        should_adjust_withdrawals_for_taxation: bool,
        should_adjust_portfolio_balance_for_inflation: bool,
        allow_negative_balances: bool,
        home_sale_net_proceeds: Decimal,
        years_in_future_of_home_purchase: int) -> Decimal:
    '''
    Calculate balance at end of life expectancy given that
    the balance at retirement has already been calculated.
    '''
    if (isinstance(a_post_retirement_annual_withdrawal, Decimal)) and (a_post_retirement_annual_withdrawal >= 0):
        raise ValueError(
            "a_post_retirement_annual_contribution was a positive "
            "value but it must be a negative value")
    balances_by_year = []
    post_retirement_simulation_year = 1
    compounded_balance = a_balance_at_retirement
    # Loop over the num_years_between_retirement_and_eol
    # compounding our annual returns and contributions(withdrawals)
    while post_retirement_simulation_year <= num_years_between_retirement_and_eol:
        annual_withdrawal = a_post_retirement_annual_withdrawal \
            + a_post_retirement_annual_additional_income
        years_since_simulation_began = num_years_until_retirement \
            + post_retirement_simulation_year
        if should_adjust_withdrawals_for_inflation:
            annual_withdrawal = adjust_post_retirement_withdrawal_amount_for_inflation(
                retirement_withdrawal_amount=annual_withdrawal,
                a_inflation_mean=a_inflation_mean,
                years_since_simulation_began=years_since_simulation_began)
        if should_adjust_withdrawals_for_taxation:
            annual_withdrawal = adjust_post_retirement_withdrawal_amount_for_taxes(
                retirement_withdrawal_amount=annual_withdrawal,
                a_post_retirement_tax_rate=a_post_retirement_tax_rate
            )
        # TODO We currently assume half of the annual contribution is
        # made prior to compounding and half post compounding. This is
        # a simplification and should really be refactored to use a monthly compounding model
        half_of_annual_withdrawal = annual_withdrawal / 2
        compounded_balance += half_of_annual_withdrawal
        # only compound positive balances
        if isinstance(compounded_balance, Add):  # it might be a sympy object
            if compounded_balance.args[0].is_positive:
                compounded_balance = calc_compound_interest(
                    principal_amount=compounded_balance,
                    interest_rate=a_post_retirement_annual_rate_of_return,
                    num_time_periods_elapsed=1)
        else:
            if compounded_balance > 0:
                compounded_balance = calc_compound_interest(
                    principal_amount=compounded_balance,
                    interest_rate=a_post_retirement_annual_rate_of_return,
                    num_time_periods_elapsed=1)
        compounded_balance += half_of_annual_withdrawal
        if should_adjust_portfolio_balance_for_inflation:
            compounded_balance = adjust_balance_by_mean_inflation(
                a_portfolio_balance=compounded_balance,
                a_mean_inflation_rate=a_inflation_mean)
        if (years_since_simulation_began == years_in_future_of_home_purchase + 1):
            compounded_balance += home_sale_net_proceeds
        # We have depleted our entire portfolio balance
        if allow_negative_balances is False and compounded_balance <= 0:
            compounded_balance = Decimal(0.0)
            balances_by_year.append(compounded_balance)
            break
        else:
            balances_by_year.append(compounded_balance)
        post_retirement_simulation_year += 1
    return compounded_balance, balances_by_year


def pad_with_zeroes(a_list: List, num_zeroes_to_add: int):
    '''
    Pad out the right side of a list with zeroes to
    account for years where we ran out of money and ensure uniform list sizing
    '''
    padded_list = a_list.copy()
    for _ in range(num_zeroes_to_add):
        padded_list.append(Decimal(0))
    return padded_list


def calculate_retirement_balance(
        a_initial_portfolio_amount: Decimal,
        a_pre_retirement_annual_rate_of_return: Decimal,
        a_post_retirement_annual_rate_of_return: Decimal,
        num_years_until_retirement: int,
        num_years_between_retirement_and_eol: int,
        a_pre_retirement_annual_contribution: Decimal,
        a_post_retirement_annual_withdrawal: Decimal,
        a_post_retirement_annual_additional_income: Decimal,
        a_inflation_mean: Decimal,
        a_income_growth_mean: Decimal,
        a_post_retirement_tax_rate: Decimal,
        should_adjust_contributions_for_income_growth: bool,
        should_adjust_portfolio_balance_for_inflation: bool,
        should_adjust_withdrawals_for_inflation: bool,
        should_adjust_withdrawals_for_taxation: bool,
        is_solving_for_safe_withdrawal: bool,
        home_sale_net_proceeds: Decimal,
        years_in_future_of_home_purchase: int
) -> dict:
    balance_at_retirement, balances_by_year_until_retirement = \
        calc_balances_from_current_age_to_retirement(
            a_initial_portfolio_amount=a_initial_portfolio_amount,
            a_pre_retirement_annual_rate_of_return=a_pre_retirement_annual_rate_of_return,
            num_years_until_retirement=num_years_until_retirement,
            a_pre_retirement_annual_contribution=a_pre_retirement_annual_contribution,
            a_inflation_mean=a_inflation_mean,
            a_income_growth_mean=a_income_growth_mean,
            should_adjust_contributions_for_income_growth=should_adjust_contributions_for_income_growth,
            should_adjust_portfolio_balance_for_inflation=should_adjust_portfolio_balance_for_inflation,
            home_sale_net_proceeds=home_sale_net_proceeds,
            years_in_future_of_home_purchase=years_in_future_of_home_purchase)
    balance_at_end_of_life_expectancy, balances_by_year_after_retirement = \
        calc_balance_from_retirement_to_eol(
            a_balance_at_retirement=balance_at_retirement,
            a_post_retirement_annual_rate_of_return=a_post_retirement_annual_rate_of_return,
            num_years_until_retirement=num_years_until_retirement,
            num_years_between_retirement_and_eol=num_years_between_retirement_and_eol,
            a_post_retirement_annual_withdrawal=a_post_retirement_annual_withdrawal,
            a_post_retirement_annual_additional_income=a_post_retirement_annual_additional_income,
            a_inflation_mean=a_inflation_mean,
            a_post_retirement_tax_rate=a_post_retirement_tax_rate,
            should_adjust_withdrawals_for_inflation=should_adjust_withdrawals_for_inflation,
            should_adjust_withdrawals_for_taxation=should_adjust_withdrawals_for_taxation,
            should_adjust_portfolio_balance_for_inflation=should_adjust_portfolio_balance_for_inflation,
            allow_negative_balances=is_solving_for_safe_withdrawal,
            home_sale_net_proceeds=home_sale_net_proceeds,
            years_in_future_of_home_purchase=years_in_future_of_home_purchase)
    # We check if there are missing years
    # from the list where the balance was zero and pad out if needed
    if num_years_between_retirement_and_eol != len(
            balances_by_year_after_retirement):
        num_years_missing = num_years_between_retirement_and_eol - \
            len(balances_by_year_after_retirement)
        balances_by_year_after_retirement = pad_with_zeroes(
            balances_by_year_after_retirement, num_years_missing)
    all_balances = balances_by_year_until_retirement + balances_by_year_after_retirement
    if is_solving_for_safe_withdrawal is True:
        return balance_at_end_of_life_expectancy
    else:
        return {
            'ran_out_of_money_before_eol':
                True if balance_at_end_of_life_expectancy <= Decimal(0) else False,
            'balances': all_balances,
            'balance_at_retirement': round(balance_at_retirement, DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS),
            'balance_at_eol':
                round(balance_at_end_of_life_expectancy, DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS)
        }


def get_value_of_simulation_param_at_quantile(
        all_simulations: List, field_name: str, quantile: float):
    '''
    The value of an input or output parameter to the simulation
    at a quantile of the range of values used for that parameter
    '''
    quantile_as_index = (round(NUMBER_OF_SIMULATIONS * quantile) - 1)
    list_of_values = list(map(lambda x: x[field_name], all_simulations))
    sorted_list_of_values = sorted(list_of_values)
    value_at_quantile = sorted_list_of_values[quantile_as_index]
    return value_at_quantile


def get_simulation_value_at_outcome_quantile(
        all_simulations: List, field_name: str, quantile: float):
    '''
    The value of an input or output parameter to the simulation
    at a quantile of the range of outcomes for all simulations
    '''
    quantile_as_index = (round(NUMBER_OF_SIMULATIONS * quantile) - 1)
    simulation_at_quantile = all_simulations[quantile_as_index]
    value_at_simulation_quantile = simulation_at_quantile[field_name]
    return value_at_simulation_quantile


def calc_meta_simulation_stats(all_simulations: List, safe_withdrawal_amounts_by_quantile: dict) -> dict:
    num_ran_out_of_money = sum(
        map(lambda i: i['ran_out_of_money_before_eol'] is True, all_simulations))
    num_survived = sum(
        map(lambda i: i['ran_out_of_money_before_eol'] is False, all_simulations))
    survival_ratio = num_survived / (num_ran_out_of_money + num_survived)
    quantile_statistics = {}
    for quantile_value in KEY_QUANTILE_VALUES:
        pre_retirement_ror_for_quantile = get_value_of_simulation_param_at_quantile(
            all_simulations=all_simulations,
            field_name='pre_retirement_rate_of_return',
            quantile=quantile_value)
        post_retirement_ror_for_quantile = get_value_of_simulation_param_at_quantile(
            all_simulations=all_simulations,
            field_name='post_retirement_rate_of_return',
            quantile=quantile_value)
        balance_at_eol_for_quantile = get_value_of_simulation_param_at_quantile(
            all_simulations=all_simulations,
            field_name='balance_at_eol',
            quantile=quantile_value)
        balances = get_value_of_simulation_param_at_quantile(
            all_simulations=all_simulations,
            field_name='balances',
            quantile=quantile_value)
        quantile_statistics[quantile_value] = {
            'pre_retirement_rate_of_return': pre_retirement_ror_for_quantile,
            'post_retirement_rate_of_return': post_retirement_ror_for_quantile,
            'balance_at_eol': balance_at_eol_for_quantile, 'balances': balances,
            'safe_withdrawal_amount':
                safe_withdrawal_amounts_by_quantile[quantile_value]
                ['safe_withdrawal_amount']
        }
    return {
        'survival_rate': survival_ratio,
        'number_of_simulations': NUMBER_OF_SIMULATIONS,
        'quantile_statistics': quantile_statistics
    }


def calc_safe_withdrawal_amount_for_simulation(
    simulation_set_params_in: schemas.RunSimulationIn,
    pre_retirement_ror: Decimal,
    post_retirement_ror: Decimal,
    years_until_retirement: int,
    years_from_retirement_until_life_expectancy: int,
    a_post_retirement_annual_withdrawal: Decimal,
    home_sale_net_proceeds: Decimal,
    years_in_future_of_home_purchase: int
):
    simulation_output = calculate_retirement_balance(
        a_initial_portfolio_amount=simulation_set_params_in.initial_portfolio_amount,
        a_pre_retirement_annual_rate_of_return=pre_retirement_ror,
        a_post_retirement_annual_rate_of_return=post_retirement_ror,
        num_years_until_retirement=years_until_retirement,
        num_years_between_retirement_and_eol=years_from_retirement_until_life_expectancy,
        a_pre_retirement_annual_contribution=simulation_set_params_in.pre_retirement_annual_contribution,
        a_post_retirement_annual_withdrawal=a_post_retirement_annual_withdrawal,
        a_post_retirement_annual_additional_income=simulation_set_params_in.additional_post_retirement_annual_income,
        a_inflation_mean=simulation_set_params_in.inflation_mean,
        a_income_growth_mean=simulation_set_params_in.income_growth_mean,
        a_post_retirement_tax_rate=simulation_set_params_in.post_retirement_tax_rate,
        should_adjust_contributions_for_income_growth=simulation_set_params_in.adjust_contributions_for_income_growth,
        should_adjust_portfolio_balance_for_inflation=simulation_set_params_in.adjust_portfolio_balance_for_inflation,
        should_adjust_withdrawals_for_inflation=simulation_set_params_in.adjust_withdrawals_for_inflation,
        should_adjust_withdrawals_for_taxation=simulation_set_params_in.adjust_withdrawals_for_taxation,
        home_sale_net_proceeds=home_sale_net_proceeds,
        years_in_future_of_home_purchase=years_in_future_of_home_purchase,
        is_solving_for_safe_withdrawal=True
    )
    return simulation_output


def calc_safe_withdrawal_amounts_for_simulation_set(
        simulation_set_params_in: schemas.RunSimulationIn,
        years_until_retirement: int,
        years_from_retirement_until_life_expectancy: int,
        all_simulations: List,
        home_sale_net_proceeds: Decimal,
        years_in_future_of_home_purchase: int):
    num_simulations_total = len(all_simulations)
    index_positions_of_simulation_outcome = [
        round(num_simulations_total * x) for x in KEY_QUANTILE_VALUES]
    quantile_statistics = {}
    for idx, outcome_position in enumerate(
            index_positions_of_simulation_outcome):
        simulation_at_position = all_simulations[outcome_position]
        x = Symbol('x')
        safe_withdrawal_amount = solve(calc_safe_withdrawal_amount_for_simulation(
            simulation_set_params_in=simulation_set_params_in,
            pre_retirement_ror=simulation_at_position['pre_retirement_rate_of_return'],
            post_retirement_ror=simulation_at_position['post_retirement_rate_of_return'],
            years_until_retirement=years_until_retirement,
            years_from_retirement_until_life_expectancy=years_from_retirement_until_life_expectancy,
            home_sale_net_proceeds=home_sale_net_proceeds,
            years_in_future_of_home_purchase=years_in_future_of_home_purchase,
            a_post_retirement_annual_withdrawal=x
        ))
        safe_withdrawal_amount_as_positive_decimal = abs(round(
            Decimal(float(safe_withdrawal_amount[0])),
            DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS
        ))
        quantile_statistics[KEY_QUANTILE_VALUES[idx]] = {
            'safe_withdrawal_amount': safe_withdrawal_amount_as_positive_decimal}
    return quantile_statistics


def run_simulations(simulation_set_params_in: schemas.RunSimulationIn):
    years_until_retirement = calc_years_until_retirement(
        a_current_age=simulation_set_params_in.current_age,
        a_retirement_age=simulation_set_params_in.retirement_age
    )
    years_from_retirement_until_life_expectancy = calc_years_from_retirement_until_life_expectancy(
        a_retirement_age=simulation_set_params_in.retirement_age,
        a_life_expectancy=simulation_set_params_in.life_expectancy
    )
    simulation_duration = calc_simulation_duration(
        num_years_until_retirement=years_until_retirement,
        num_years_from_retirement_until_life_expectancy=years_from_retirement_until_life_expectancy)
    sample_pairs = get_random_sample_pairs(
        years_until_retirement=years_until_retirement,
        years_from_retirement_until_life_expectancy=years_from_retirement_until_life_expectancy,
        pre_retirement_mean_rate_of_return=simulation_set_params_in.pre_retirement_mean_rate_of_return,
        pre_retirement_rate_of_return_volatility=simulation_set_params_in.pre_retirement_rate_of_return_volatility,
        post_retirement_mean_rate_of_return=simulation_set_params_in.post_retirement_mean_rate_of_return,
        post_retirement_rate_of_return_volatility=simulation_set_params_in.post_retirement_rate_of_return_volatility
    )
    logger.info(f"Years until retirement: {years_until_retirement}")
    logger.info(
        "Years from retirement until end of life expectancy: "
        f"{years_from_retirement_until_life_expectancy}"
    )
    logger.info(f"Total simulation duration: {simulation_duration} years")
    all_simulation_results = []
    for (pre_retirement_ror, post_retirement_ror) in \
            tqdm(sample_pairs, desc=f"Running {NUMBER_OF_SIMULATIONS} simulations"):
        simulation_output = calculate_retirement_balance(
            a_initial_portfolio_amount=simulation_set_params_in.initial_portfolio_amount,
            a_pre_retirement_annual_rate_of_return=pre_retirement_ror,
            a_post_retirement_annual_rate_of_return=post_retirement_ror,
            num_years_until_retirement=years_until_retirement,
            num_years_between_retirement_and_eol=years_from_retirement_until_life_expectancy,
            a_pre_retirement_annual_contribution=simulation_set_params_in.pre_retirement_annual_contribution,
            a_post_retirement_annual_withdrawal=simulation_set_params_in.post_retirement_annual_withdrawal,
            a_post_retirement_annual_additional_income=simulation_set_params_in.additional_post_retirement_annual_income,
            a_inflation_mean=simulation_set_params_in.inflation_mean,
            a_income_growth_mean=simulation_set_params_in.income_growth_mean,
            a_post_retirement_tax_rate=simulation_set_params_in.post_retirement_tax_rate,
            should_adjust_contributions_for_income_growth=simulation_set_params_in.adjust_contributions_for_income_growth,
            should_adjust_portfolio_balance_for_inflation=simulation_set_params_in.adjust_portfolio_balance_for_inflation,
            should_adjust_withdrawals_for_inflation=simulation_set_params_in.adjust_withdrawals_for_inflation,
            should_adjust_withdrawals_for_taxation=simulation_set_params_in.adjust_withdrawals_for_taxation,
            home_sale_net_proceeds=simulation_set_params_in.home_sale_net_proceeds,
            years_in_future_of_home_purchase=simulation_set_params_in.years_in_future_of_home_purchase,
            is_solving_for_safe_withdrawal=False)
        single_simulation_result = {
            'ran_out_of_money_before_eol': simulation_output['ran_out_of_money_before_eol'],
            'balance_at_eol': simulation_output['balance_at_eol'],
            'balance_at_retirement': simulation_output['balance_at_retirement'],
            'pre_retirement_rate_of_return': pre_retirement_ror,
            'post_retirement_rate_of_return': post_retirement_ror,
            'balances': simulation_output['balances']
        }
        all_simulation_results.append(single_simulation_result)
    all_simulation_results_sorted = sorted(
        all_simulation_results,
        key=lambda i: (i['balance_at_eol'],
                       i['balance_at_retirement']))
    safe_withdrawal_amounts_by_quantile = calc_safe_withdrawal_amounts_for_simulation_set(
        simulation_set_params_in=simulation_set_params_in,
        years_until_retirement=years_until_retirement,
        years_from_retirement_until_life_expectancy=years_from_retirement_until_life_expectancy,
        home_sale_net_proceeds=simulation_set_params_in.home_sale_net_proceeds,
        years_in_future_of_home_purchase=simulation_set_params_in.years_in_future_of_home_purchase,
        all_simulations=all_simulation_results_sorted)
    meta_simulation_statistics = calc_meta_simulation_stats(
        all_simulations=all_simulation_results_sorted,
        safe_withdrawal_amounts_by_quantile=safe_withdrawal_amounts_by_quantile
    )
    logger.info(
        f"Number of simulations run: {meta_simulation_statistics['number_of_simulations']}")
    logger.info(
        f"Portfolio survival rate: {round(meta_simulation_statistics['survival_rate'] * 100, 3)}%")
    return meta_simulation_statistics
