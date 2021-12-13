from decimal import Decimal

DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS = 2
# Portfolio Parameters
initial_portfolio_amount = Decimal(10000)
pre_retiment_annual_contribution = Decimal(25000)
post_retirement_annual_contribution = Decimal(-92000)

# Lifestyle Parameters
current_age = 45
retirement_age = 65
life_expectancy = 95

# Market Conditions
inflation_mean = Decimal(0.035)
pre_retirement_annual_rate_of_return = Decimal(0.03875)
post_retirement_annual_rate_of_return = Decimal(0.075)


def calc_years_until_retirement(a_current_age: int, a_retirement_age: int) -> int:
    return a_retirement_age - a_current_age


def calc_years_from_retirement_until_life_expectancy(
        a_retirement_age: int, a_life_expectancy: int) -> int:
    return a_life_expectancy - a_retirement_age


def calc_simulation_duration(years_until_retirement: int,
                             years_from_retirement_until_life_expectancy: int) -> int:
    return years_until_retirement + years_from_retirement_until_life_expectancy


def calc_compound_interest(principal_amount: Decimal, interest_rate: Decimal,
                           num_time_periods_elapsed: int) -> Decimal:
    interest_rate_plus_one = interest_rate + Decimal(1)
    compounded_interest_rate = pow(interest_rate_plus_one, num_time_periods_elapsed)
    final_amount = principal_amount * compounded_interest_rate
    return round(final_amount, DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS)


years_until_retirement = calc_years_until_retirement(
    a_current_age=current_age, a_retirement_age=retirement_age)
years_from_retirement_until_life_expectancy = calc_years_from_retirement_until_life_expectancy(
    a_retirement_age=retirement_age, a_life_expectancy=life_expectancy)
simulation_duration = calc_simulation_duration(
    years_until_retirement=years_until_retirement,
    years_from_retirement_until_life_expectancy=years_from_retirement_until_life_expectancy)
final_balance = calc_compound_interest(
    principal_amount=initial_portfolio_amount, interest_rate=pre_retirement_annual_rate_of_return,
    num_time_periods_elapsed=simulation_duration)
print(f"Years until retirement = {years_until_retirement}")
print(
    "Years from retirement until end of life expectancy = "
    f"{years_from_retirement_until_life_expectancy}"
)
print(f"Total simulation duration is {simulation_duration}")
print(f"The final_balance amount is {final_balance}")
