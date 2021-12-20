from decimal import Decimal
from typing import List
from tqdm import tqdm
from numpy.core.fromnumeric import mean

from src.constants import (DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS,
                           ADJUST_PORTFOLIO_BALANCE_FOR_INFLATION,
                           ADJUST_CONTRIBUTIONS_FOR_INCOME_GROWTH,
                           ADJUST_WITHDRAWALS_FOR_INFLATION,
                           ADJUST_WITHDRAWALS_FOR_TAXATION,
                           INITIAL_PORTFOLIO_AMOUNT,
                           PRE_RETIREMENT_ANNUAL_CONTRIBUTION,
                           POST_RETIREMENT_ANNUAL_WITHDRAWAL,
                           CURRENT_AGE,
                           RETIREMENT_AGE,
                           LIFE_EXPECTANCY,
                           INFLATION_MEAN,
                           INCOME_GROWTH_MEAN,
                           POST_RETIREMENT_TAX_RATE,
                           NUMBER_OF_SIMULATIONS,
                           ADDITIONAL_POST_RETIREMENT_ANNUAL_INCOME)
from src.simulation.distribution_sampling import get_random_sample_pairs


def format_as_currency(currency_amount: Decimal) -> str:
    return '${:,.2f}'.format(currency_amount)


def calc_years_until_retirement(a_current_age: int, a_retirement_age: int) -> int:
    '''Calculate the number of years from the current age until the retirement age'''
    return a_retirement_age - a_current_age


def calc_years_from_retirement_until_life_expectancy(
        a_retirement_age: int, a_life_expectancy: int) -> int:
    '''Calculate the number of years from retirement age until the end of life expectancy'''
    return a_life_expectancy - a_retirement_age


def calc_simulation_duration(num_years_until_retirement: int,
                             num_years_from_retirement_until_life_expectancy: int) -> int:
    '''Calculate the total duration of the simulation in years'''
    return num_years_until_retirement + num_years_from_retirement_until_life_expectancy


def calc_compound_interest(principal_amount: Decimal, interest_rate: Decimal,
                           num_time_periods_elapsed: int) -> Decimal:
    '''Calculate a final balance using the standard compound interest formula'''
    times_compounded_per_unit_of_time = 1  # We currently assume annual compounding though this could change in the future
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
        principal_amount=retirement_contribution_amount, interest_rate=a_income_growth_mean,
        num_time_periods_elapsed=years_since_simulation_began)
    return adjusted_contribution_amount


def adjust_post_retirement_withdrawal_amount_for_inflation(
        retirement_withdrawal_amount: Decimal,
        a_inflation_mean: Decimal,
        years_since_simulation_began: int) -> Decimal:
    '''Adjust the post-retirement withdrawal amount to account for inflation'''
    adjusted_withdrawal_amount = calc_compound_interest(
        principal_amount=retirement_withdrawal_amount, interest_rate=a_inflation_mean,
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
    withdrawal_amount_adjusted_for_taxes = retirement_withdrawal_amount + additional_amount_to_cover_taxes
    return withdrawal_amount_adjusted_for_taxes


def calc_balances_from_current_age_to_retirement(
        a_initial_portfolio_amount: Decimal,
        a_pre_retirement_annual_rate_of_return: Decimal,
        num_years_until_retirement: int,
        a_pre_retirement_annual_contribution: Decimal,
        a_inflation_mean: Decimal,
        a_income_growth_mean: Decimal) -> Decimal:
    '''Calculate balance at retirement age'''
    balances_by_year = []
    pre_retirement_simulation_year = 1
    compounded_balance = a_initial_portfolio_amount
    # Loop over the num_years_until_retirement compounding our annual returns and contributions
    while pre_retirement_simulation_year <= num_years_until_retirement:
        # print(
        #     f"Balance at beginning of pre-retirement year {pre_retirement_simulation_year} = {format_as_currency(compounded_balance)}")
        annual_contribution = a_pre_retirement_annual_contribution
        if ADJUST_CONTRIBUTIONS_FOR_INCOME_GROWTH:
            annual_contribution = adjust_pre_retirement_contribution_amount_for_income_growth(
                a_income_growth_mean=a_income_growth_mean,
                retirement_contribution_amount=annual_contribution,
                years_since_simulation_began=pre_retirement_simulation_year)
        # TODO We currently assume half of the annual contribution is made prior to compounding and half post compounding. This is
        # a simplification and should really be refactored to use a monthly compounding model
        half_of_annual_contribution = annual_contribution / 2
        compounded_balance += half_of_annual_contribution
        compounded_balance = calc_compound_interest(
            principal_amount=compounded_balance,
            interest_rate=a_pre_retirement_annual_rate_of_return,
            num_time_periods_elapsed=1)
        compounded_balance += half_of_annual_contribution
        if ADJUST_PORTFOLIO_BALANCE_FOR_INFLATION:
            compounded_balance = adjust_balance_by_mean_inflation(
                a_portfolio_balance=compounded_balance, a_mean_inflation_rate=a_inflation_mean)
        # print(
        #     f"Balance at end of pre-retirement year {pre_retirement_simulation_year} = {format_as_currency(compounded_balance)}")
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
        a_post_retirement_tax_rate=Decimal) -> Decimal:
    '''Calculate balance at end of life expectancy given that the balance at retirement has already been calculated.'''
    if a_post_retirement_annual_withdrawal >= 0:
        raise ValueError(
            "a_post_retirement_annual_contribution was a positive value but it must be a negative value")
    balances_by_year = []
    post_retirement_simulation_year = 1
    compounded_balance = a_balance_at_retirement
    # Loop over the num_years_between_retirement_and_eol compounding our annual returns and contributions(withdrawals)
    while post_retirement_simulation_year <= num_years_between_retirement_and_eol:
        # print(
        #     f"Balance at beginning of post-retirement year {post_retirement_simulation_year} = {format_as_currency(compounded_balance)}")
        annual_withdrawal = a_post_retirement_annual_withdrawal + a_post_retirement_annual_additional_income
        if ADJUST_WITHDRAWALS_FOR_INFLATION:
            years_since_simulation_began = num_years_until_retirement + post_retirement_simulation_year
            annual_withdrawal = adjust_post_retirement_withdrawal_amount_for_inflation(
                retirement_withdrawal_amount=annual_withdrawal,
                a_inflation_mean=a_inflation_mean,
                years_since_simulation_began=years_since_simulation_began)
        if ADJUST_WITHDRAWALS_FOR_TAXATION:
            annual_withdrawal = adjust_post_retirement_withdrawal_amount_for_taxes(
                retirement_withdrawal_amount=annual_withdrawal,
                a_post_retirement_tax_rate=a_post_retirement_tax_rate
            )
        # TODO We currently assume half of the annual contribution is made prior to compounding and half post compounding. This is
        # a simplification and should really be refactored to use a monthly compounding model
        half_of_annual_withdrawal = annual_withdrawal / 2
        compounded_balance += half_of_annual_withdrawal
        compounded_balance = calc_compound_interest(
            principal_amount=compounded_balance,
            interest_rate=a_post_retirement_annual_rate_of_return,
            num_time_periods_elapsed=1)
        compounded_balance += half_of_annual_withdrawal
        if ADJUST_PORTFOLIO_BALANCE_FOR_INFLATION:
            compounded_balance = adjust_balance_by_mean_inflation(
                a_portfolio_balance=compounded_balance, a_mean_inflation_rate=a_inflation_mean)
        # print(
        #     f"Balance at end of post-retirement year {post_retirement_simulation_year} = {format_as_currency(compounded_balance)}")
        if compounded_balance <= 0:  # We have depleted our entire portfolio balance
            # print(
            #     f"Portfolio balance depleted in year {post_retirement_simulation_year} of retirement")
            compounded_balance = Decimal(0.0)
            balances_by_year.append(compounded_balance)
            break
        else:
            balances_by_year.append(compounded_balance)
        post_retirement_simulation_year += 1
    return compounded_balance, balances_by_year


def pad_with_zeroes(a_list: List, num_zeroes_to_add: int):
    '''Pad out the right side of a list with zeroes to account for years where we ran out of money and ensure uniform list sizing'''
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
        a_post_retirement_tax_rate: Decimal
) -> dict:
    balance_at_retirement, balances_by_year_until_retirement = calc_balances_from_current_age_to_retirement(
        a_initial_portfolio_amount=a_initial_portfolio_amount,
        a_pre_retirement_annual_rate_of_return=a_pre_retirement_annual_rate_of_return,
        num_years_until_retirement=num_years_until_retirement,
        a_pre_retirement_annual_contribution=a_pre_retirement_annual_contribution,
        a_inflation_mean=a_inflation_mean,
        a_income_growth_mean=a_income_growth_mean)
    balance_at_end_of_life_expectancy, balances_by_year_after_retirement = calc_balance_from_retirement_to_eol(
        a_balance_at_retirement=balance_at_retirement,
        a_post_retirement_annual_rate_of_return=a_post_retirement_annual_rate_of_return,
        num_years_until_retirement=num_years_until_retirement,
        num_years_between_retirement_and_eol=num_years_between_retirement_and_eol,
        a_post_retirement_annual_withdrawal=a_post_retirement_annual_withdrawal,
        a_post_retirement_annual_additional_income=a_post_retirement_annual_additional_income,
        a_inflation_mean=a_inflation_mean,
        a_post_retirement_tax_rate=a_post_retirement_tax_rate)
    # We check if there are missing years from the list where the balance was zero and pad out if needed
    if num_years_between_retirement_and_eol != len(balances_by_year_after_retirement):
        num_years_missing = num_years_between_retirement_and_eol - \
            len(balances_by_year_after_retirement)
        balances_by_year_after_retirement = pad_with_zeroes(
            balances_by_year_after_retirement, num_years_missing)
    return {
        'ran_out_of_money_before_eol': True if balance_at_end_of_life_expectancy <= Decimal(0) else False,
        'balances': balances_by_year_until_retirement + balances_by_year_after_retirement,
        'balance_at_retirement': round(balance_at_retirement, DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS),
        'balance_at_eol': round(balance_at_end_of_life_expectancy, DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS)
    }


def get_simulation_value_at_value_quantile(all_simulations: List, field_name: str, quantile: float):
    '''The value of an input or output parameter to the simulation at a quantile of the range of values used for that parameter'''
    quantile_as_index = (round(NUMBER_OF_SIMULATIONS * quantile) - 1)
    list_of_values = list(map(lambda x: x[field_name], all_simulations))
    sorted_list_of_values = sorted(list_of_values)
    value_at_quantile = sorted_list_of_values[quantile_as_index]
    return value_at_quantile


def get_simulation_value_at_outcome_quantile(
        all_simulations: List, field_name: str, quantile: float):
    '''The value of an input or output parameter to the simulation at a quantile of the range of outcomes for all simulations'''
    quantile_as_index = (round(NUMBER_OF_SIMULATIONS * quantile) - 1)
    simulation_at_quantile = all_simulations[quantile_as_index]
    value_at_simulation_quantile = simulation_at_quantile[field_name]
    return value_at_simulation_quantile


def calc_meta_simulation_stats(all_simulations: List) -> dict:
    num_ran_out_of_money = sum(
        map(lambda i: i['ran_out_of_money_before_eol'] == True, all_simulations))
    num_survived = sum(map(lambda i: i['ran_out_of_money_before_eol'] == False, all_simulations))
    survival_ratio = num_survived / (num_ran_out_of_money + num_survived)
    key_quantile_values = [0.1, 0.25, 0.5, 0.75, 0.9]
    quantile_statistics = {}
    for quantile_value in key_quantile_values:
        pre_retirement_ror_for_quantile = get_simulation_value_at_value_quantile(
            all_simulations=all_simulations,
            field_name='pre_retirement_rate_of_return',
            quantile=quantile_value)
        post_retirement_ror_for_quantile = get_simulation_value_at_value_quantile(
            all_simulations=all_simulations,
            field_name='post_retirement_rate_of_return',
            quantile=quantile_value)
        balance_at_eol_for_quantile = get_simulation_value_at_value_quantile(
            all_simulations=all_simulations,
            field_name='balance_at_eol',
            quantile=quantile_value)
        quantile_statistics[quantile_value] = {
            'pre_retirement_rate_of_return': pre_retirement_ror_for_quantile,
            'post_retirement_rate_of_return': post_retirement_ror_for_quantile,
            'balance_at_eol': balance_at_eol_for_quantile
        }
    return {
        'survival_rate': survival_ratio,
        'number_of_simulations': NUMBER_OF_SIMULATIONS,
        'quantile_statistics': quantile_statistics
    }


years_until_retirement = calc_years_until_retirement(
    a_current_age=CURRENT_AGE, a_retirement_age=RETIREMENT_AGE)
years_from_retirement_until_life_expectancy = calc_years_from_retirement_until_life_expectancy(
    a_retirement_age=RETIREMENT_AGE, a_life_expectancy=LIFE_EXPECTANCY)
simulation_duration = calc_simulation_duration(
    num_years_until_retirement=years_until_retirement,
    num_years_from_retirement_until_life_expectancy=years_from_retirement_until_life_expectancy)
sample_pairs = get_random_sample_pairs(
    years_until_retirement=years_until_retirement,
    years_from_retirement_until_life_expectancy=years_from_retirement_until_life_expectancy)
print(f"Years until retirement: {years_until_retirement}")
print(
    "Years from retirement until end of life expectancy: "
    f"{years_from_retirement_until_life_expectancy}"
)
print(f"Total simulation duration: {simulation_duration} years")
all_simulation_results = []
for (pre_retirement_ror, post_retirement_ror) in tqdm(sample_pairs, desc=f"Running {NUMBER_OF_SIMULATIONS} simulations"):
    simulation_output = calculate_retirement_balance(
        a_initial_portfolio_amount=INITIAL_PORTFOLIO_AMOUNT,
        a_pre_retirement_annual_rate_of_return=Decimal(pre_retirement_ror),
        a_post_retirement_annual_rate_of_return=Decimal(post_retirement_ror),
        num_years_until_retirement=years_until_retirement,
        num_years_between_retirement_and_eol=years_from_retirement_until_life_expectancy,
        a_pre_retirement_annual_contribution=PRE_RETIREMENT_ANNUAL_CONTRIBUTION,
        a_post_retirement_annual_withdrawal=POST_RETIREMENT_ANNUAL_WITHDRAWAL,
        a_post_retirement_annual_additional_income=ADDITIONAL_POST_RETIREMENT_ANNUAL_INCOME,
        a_inflation_mean=INFLATION_MEAN,
        a_income_growth_mean=INCOME_GROWTH_MEAN,
        a_post_retirement_tax_rate=POST_RETIREMENT_TAX_RATE
    )
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
    all_simulation_results, key=lambda i: (i['balance_at_eol'], i['balance_at_retirement']))
meta_simulation_statistics = calc_meta_simulation_stats(all_simulation_results_sorted)
print(f"Number of simulations run: {meta_simulation_statistics['number_of_simulations']}")
print(f"Portfolio survival rate: {round(meta_simulation_statistics['survival_rate'] * 100, 3)}%")
# print(
#     f"The balance_at_retirement is {format_as_currency(retirement_balance['balance_at_retirement'])}")
# print(
#     f"The balance_at_end_of_life_expectancy is {format_as_currency(retirement_balance['balance_at_eol'])}")
