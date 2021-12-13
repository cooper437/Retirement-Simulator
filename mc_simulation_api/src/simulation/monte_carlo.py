from decimal import Decimal

DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS = 2
# Portfolio Parameters
initial_portfolio_amount = Decimal(10000)
pre_retirement_annual_contribution = Decimal(25000)
post_retirement_annual_contribution = Decimal(-92000)  # Typically a negative number

# Lifestyle Parameters
current_age = 45
retirement_age = 65
life_expectancy = 95

# Market Condition Parameters
inflation_mean = Decimal(0.035)
pre_retirement_annual_rate_of_return = Decimal(0.1287)
post_retirement_annual_rate_of_return = Decimal(0.075)


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
    interest_rate_plus_one = interest_rate + Decimal(1)
    compounded_interest_rate = pow(interest_rate_plus_one, num_time_periods_elapsed)
    final_amount = principal_amount * compounded_interest_rate
    return round(final_amount, DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS)


def calc_balance_from_current_age_to_retirement(
        a_initial_portfolio_amount: Decimal,
        a_pre_retirement_annual_rate_of_return: Decimal,
        num_years_until_retirement: int,
        a_pre_retirement_annual_contribution: Decimal) -> Decimal:
    '''Calculate balance at retirement age'''
    iteration = 1
    half_of_annual_contribution = a_pre_retirement_annual_contribution / 2
    compounded_balance = a_initial_portfolio_amount
    while iteration <= num_years_until_retirement:
      # TODO We currently assume half of the annual contribution is made prior to compounding and halg post compounding. This is a simplification and should really be refactored to use a monthly compounding model
        compounded_balance += half_of_annual_contribution
        print(f"Compounded balance at beginning of year {iteration} = {compounded_balance}")
        compounded_balance = calc_compound_interest(
            principal_amount=compounded_balance,
            interest_rate=a_pre_retirement_annual_rate_of_return,
            num_time_periods_elapsed=1)
        print(f"Compounded balance at end of year {iteration} = {compounded_balance}")
        compounded_balance += half_of_annual_contribution
        iteration += 1
    return compounded_balance


def calc_balance_from_retirement_to_eol(
        a_balance_at_retirement: Decimal,
        a_post_retirement_annual_rate_of_return: Decimal,
        num_years_between_retirement_and_eol: int,
        a_post_retirement_annual_contribution: Decimal) -> Decimal:
    '''Calculate balance once life expectancy is reached given that the balance at retirement has already been calculated.'''
    a_balance_at_end_of_life_expectancy = calc_compound_interest(
        principal_amount=a_balance_at_retirement,
        interest_rate=a_post_retirement_annual_rate_of_return,
        num_time_periods_elapsed=num_years_between_retirement_and_eol)
    return a_balance_at_end_of_life_expectancy


def calculate_retirement_balance(
        a_initial_portfolio_amount: Decimal,
        a_pre_retirement_annual_rate_of_return: Decimal,
        a_post_retirement_annual_rate_of_return: Decimal,
        num_years_until_retirement: int,
        num_years_between_retirement_and_eol: int,
        a_pre_retirement_annual_contribution: Decimal,
        a_post_retirement_annual_contribution: Decimal
) -> dict:
    balance_at_retirement = calc_balance_from_current_age_to_retirement(
        a_initial_portfolio_amount=a_initial_portfolio_amount,
        a_pre_retirement_annual_rate_of_return=a_pre_retirement_annual_rate_of_return,
        num_years_until_retirement=num_years_until_retirement,
        a_pre_retirement_annual_contribution=a_pre_retirement_annual_contribution)
    balance_at_end_of_life_expectancy = calc_balance_from_retirement_to_eol(
        a_balance_at_retirement=balance_at_retirement,
        a_post_retirement_annual_rate_of_return=a_post_retirement_annual_rate_of_return,
        num_years_between_retirement_and_eol=num_years_between_retirement_and_eol,
        a_post_retirement_annual_contribution=a_post_retirement_annual_contribution)
    return {
        'Balance at retirement': balance_at_retirement,
        'Balance at eol': balance_at_end_of_life_expectancy
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
    a_post_retirement_annual_contribution=post_retirement_annual_contribution
)
print(f"Years until retirement = {years_until_retirement}")
print(
    "Years from retirement until end of life expectancy = "
    f"{years_from_retirement_until_life_expectancy}"
)
print(f"Total simulation duration is {simulation_duration}")
print(f"The balance_at_retirement is {retirement_balance['Balance at retirement']}")
print(f"The balance_at_end_of_life_expectancy is {retirement_balance['Balance at eol']}")
