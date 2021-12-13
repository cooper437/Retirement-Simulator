from decimal import Decimal
# Portfolio Parameters
initial_portfolio_amount = Decimal(100000)
pre_retiment_annual_contribution = Decimal(25000)
post_retirement_annual_contribution = Decimal(-92000)

# Lifestyle Parameters
current_age = 45
retirement_age = 65
life_expectancy = 95

# Market Conditions
inflation_mean = Decimal(0.035)
pre_retirement_annual_rate_of_return = Decimal(0.12)
post_retirement_annual_rate_of_return = Decimal(0.075)


def calc_years_until_retirement(a_current_age: int, a_retirement_age: int) -> int:
    return a_retirement_age - a_current_age


def calc_years_from_retirement_until_life_expectancy(
        a_retirement_age: int, a_life_expectancy: int) -> int:
    return a_life_expectancy - a_retirement_age


def calc_simulation_duration(years_until_retirement: int,
                             years_from_retirement_until_life_expectancy: int) -> int:
    return years_until_retirement + years_from_retirement_until_life_expectancy


years_until_retirement = calc_years_until_retirement(
    a_current_age=current_age, a_retirement_age=retirement_age)
years_from_retirement_until_life_expectancy = calc_years_from_retirement_until_life_expectancy(
    a_retirement_age=retirement_age, a_life_expectancy=life_expectancy)
simulation_duration = calc_simulation_duration(
    years_until_retirement=years_until_retirement,
    years_from_retirement_until_life_expectancy=years_from_retirement_until_life_expectancy)
print(f"Years until retirement = {years_until_retirement}")
print(
    "Years from retirement until end of life expectancy = "
    f"{years_from_retirement_until_life_expectancy}"
)
