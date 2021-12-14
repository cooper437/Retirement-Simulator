from decimal import Decimal

DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS = 2
ADJUST_PORTFOLIO_BALANCE_FOR_INFLATION = True
ADJUST_CONTRIBUTIONS_FOR_WAGE_GROWTH = True
ADJUST_WITHDRAWALS_FOR_INFLATION = True

# Portfolio Parameters
initial_portfolio_amount = Decimal(1000000)
pre_retirement_annual_contribution = Decimal(45000)
post_retirement_annual_contribution = Decimal(-92000)  # Typically a negative number

# Lifestyle Parameters
current_age = 45
retirement_age = 65
life_expectancy = 95

# Market Condition Parameters
inflation_mean = Decimal(0.035)
wage_growth_mean = Decimal(0.015)
pre_retirement_annual_rate_of_return = Decimal(0.1287)
post_retirement_annual_rate_of_return = Decimal(0.075)


def format_as_currency(currency_amount: Decimal) -> str:
    return '${:,.2f}'.format(currency_amount)


def calc_years_until_retirement(a_current_age: int, a_retirement_age: int) -> int:
    '''Calculate the number of years from the current age until the retirement age'''
    return a_retirement_age - a_current_age


def calc_years_from_retirement_until_life_expectancy(
        a_retirement_age: int, a_life_expectancy: int) -> int:
    '''Calculate the number of years from retirement age until the end of life expectancy'''
    return a_life_expectancy - a_retirement_age


def calc_simulation_duration(years_until_retirement: int,
                             years_from_retirement_until_life_expectancy: int) -> int:
    '''Calculate the total duration of the simulation in years'''
    return years_until_retirement + years_from_retirement_until_life_expectancy


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


def adjust_pre_retirement_contribution_amount_for_wage_growth(
        retirement_contribution_amount: Decimal,
        a_wage_growth_mean: Decimal,
        years_since_simulation_began: int) -> Decimal:
    '''Adjust the pre-retirement contribution amount to account for wage growth'''
    adjusted_contribution_amount = calc_compound_interest(
        principal_amount=retirement_contribution_amount, interest_rate=a_wage_growth_mean,
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


def calc_balance_from_current_age_to_retirement(
        a_initial_portfolio_amount: Decimal,
        a_pre_retirement_annual_rate_of_return: Decimal,
        num_years_until_retirement: int,
        a_pre_retirement_annual_contribution: Decimal,
        a_inflation_mean: Decimal,
        a_wage_growth_mean: Decimal) -> Decimal:
    '''Calculate balance at retirement age'''
    pre_retirement_simulation_year = 1
    compounded_balance = a_initial_portfolio_amount
    # Loop over the num_years_until_retirement compounding our annual returns and contributions
    while pre_retirement_simulation_year <= num_years_until_retirement:
        print(
            f"Balance at beginning of pre-retirement year {pre_retirement_simulation_year} = {format_as_currency(compounded_balance)}")
        annual_contribution = a_pre_retirement_annual_contribution
        if ADJUST_CONTRIBUTIONS_FOR_WAGE_GROWTH:
            annual_contribution = adjust_pre_retirement_contribution_amount_for_wage_growth(
                a_wage_growth_mean=a_wage_growth_mean,
                retirement_contribution_amount=annual_contribution,
                years_since_simulation_began=pre_retirement_simulation_year)
        # TODO We currently assume half of the annual contribution is made prior to compounding and half post compounding. This is a simplification and should really be refactored to use a monthly compounding model
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
        print(
            f"Balance at end of pre-retirement year {pre_retirement_simulation_year} = {format_as_currency(compounded_balance)}")
        pre_retirement_simulation_year += 1
    return compounded_balance


def calc_balance_from_retirement_to_eol(
        a_balance_at_retirement: Decimal,
        a_post_retirement_annual_rate_of_return: Decimal,
        num_years_until_retirement: int,
        num_years_between_retirement_and_eol: int,
        a_post_retirement_annual_contribution: Decimal,
        a_inflation_mean: Decimal) -> Decimal:
    '''Calculate balance once life expectancy is reached given that the balance at retirement has already been calculated.'''
    if a_post_retirement_annual_contribution >= 0:
        raise ValueError(
            "a_post_retirement_annual_contribution was a positive value but it must be a negative value")
    post_retirement_simulation_year = 1
    compounded_balance = a_balance_at_retirement
    # Loop over the num_years_between_retirement_and_eol compounding our annual returns and contributions(withdrawals)
    while post_retirement_simulation_year <= num_years_between_retirement_and_eol:
        print(
            f"Balance at beginning of post-retirement year {post_retirement_simulation_year} = {format_as_currency(compounded_balance)}")
        annual_contribution = a_post_retirement_annual_contribution
        if ADJUST_WITHDRAWALS_FOR_INFLATION:
            years_since_simulation_began = num_years_until_retirement + post_retirement_simulation_year
            annual_contribution = adjust_post_retirement_withdrawal_amount_for_inflation(
                retirement_withdrawal_amount=annual_contribution,
                a_inflation_mean=a_inflation_mean,
                years_since_simulation_began=years_since_simulation_began)
      # TODO We currently assume half of the annual contribution is made prior to compounding and half post compounding. This is a simplification and should really be refactored to use a monthly compounding model
        half_of_annual_contribution = annual_contribution / 2
        compounded_balance += half_of_annual_contribution
        compounded_balance = calc_compound_interest(
            principal_amount=compounded_balance,
            interest_rate=a_post_retirement_annual_rate_of_return,
            num_time_periods_elapsed=1)
        compounded_balance += half_of_annual_contribution
        if ADJUST_PORTFOLIO_BALANCE_FOR_INFLATION:
            compounded_balance = adjust_balance_by_mean_inflation(
                a_portfolio_balance=compounded_balance, a_mean_inflation_rate=a_inflation_mean)
        print(
            f"Balance at end of post-retirement year {post_retirement_simulation_year} = {format_as_currency(compounded_balance)}")
        if compounded_balance <= 0:  # We have depleted our entire portfolio balance
            print(
                f"Portfolio balance depleted in year {post_retirement_simulation_year} of retirement")
            compounded_balance = 0
            break
        post_retirement_simulation_year += 1
    return compounded_balance


def calculate_retirement_balance(
        a_initial_portfolio_amount: Decimal,
        a_pre_retirement_annual_rate_of_return: Decimal,
        a_post_retirement_annual_rate_of_return: Decimal,
        num_years_until_retirement: int,
        num_years_between_retirement_and_eol: int,
        a_pre_retirement_annual_contribution: Decimal,
        a_post_retirement_annual_contribution: Decimal,
        a_inflation_mean: Decimal,
        a_wage_growth_mean: Decimal
) -> dict:
    balance_at_retirement = calc_balance_from_current_age_to_retirement(
        a_initial_portfolio_amount=a_initial_portfolio_amount,
        a_pre_retirement_annual_rate_of_return=a_pre_retirement_annual_rate_of_return,
        num_years_until_retirement=num_years_until_retirement,
        a_pre_retirement_annual_contribution=a_pre_retirement_annual_contribution,
        a_inflation_mean=a_inflation_mean,
        a_wage_growth_mean=a_wage_growth_mean)
    balance_at_end_of_life_expectancy = calc_balance_from_retirement_to_eol(
        a_balance_at_retirement=balance_at_retirement,
        a_post_retirement_annual_rate_of_return=a_post_retirement_annual_rate_of_return,
        num_years_until_retirement=num_years_until_retirement,
        num_years_between_retirement_and_eol=num_years_between_retirement_and_eol,
        a_post_retirement_annual_contribution=a_post_retirement_annual_contribution,
        a_inflation_mean=a_inflation_mean)
    return {
        'Balance at retirement': round(balance_at_retirement, DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS),
        'Balance at eol': round(balance_at_end_of_life_expectancy, DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS)
    }


years_until_retirement = calc_years_until_retirement(
    a_current_age=current_age, a_retirement_age=retirement_age)
years_from_retirement_until_life_expectancy = calc_years_from_retirement_until_life_expectancy(
    a_retirement_age=retirement_age, a_life_expectancy=life_expectancy)
simulation_duration = calc_simulation_duration(
    years_until_retirement=years_until_retirement,
    years_from_retirement_until_life_expectancy=years_from_retirement_until_life_expectancy)
retirement_balance = calculate_retirement_balance(
    a_initial_portfolio_amount=initial_portfolio_amount,
    a_pre_retirement_annual_rate_of_return=pre_retirement_annual_rate_of_return,
    a_post_retirement_annual_rate_of_return=post_retirement_annual_rate_of_return,
    num_years_until_retirement=years_until_retirement,
    num_years_between_retirement_and_eol=years_from_retirement_until_life_expectancy,
    a_pre_retirement_annual_contribution=pre_retirement_annual_contribution,
    a_post_retirement_annual_contribution=post_retirement_annual_contribution,
    a_inflation_mean=inflation_mean,
    a_wage_growth_mean=wage_growth_mean
)
print(f"Years until retirement = {years_until_retirement}")
print(
    "Years from retirement until end of life expectancy = "
    f"{years_from_retirement_until_life_expectancy}"
)
print(f"Total simulation duration is {simulation_duration}")
print(
    f"The balance_at_retirement is {format_as_currency(retirement_balance['Balance at retirement'])}")
print(
    f"The balance_at_end_of_life_expectancy is {format_as_currency(retirement_balance['Balance at eol'])}")
