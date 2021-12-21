from pydantic import (BaseModel,
                      PositiveInt,
                      NegativeInt,
                      condecimal
                      )

decimal_positive = condecimal(ge=0)


class RunSimulationIn(BaseModel):
    adjust_portfolio_balance_for_inflation: bool
    adjust_contributions_for_income_growth: bool
    adjust_withdrawals_for_inflation: bool
    adjust_withdrawals_for_taxation: bool
    initial_portfolio_amount: PositiveInt
    pre_retirement_annual_contribution: PositiveInt
    post_retirement_annual_withdrawal: NegativeInt
    current_age: PositiveInt
    retirement_age: PositiveInt
    life_expectancy: PositiveInt
    inflation_mean: decimal_positive
    income_growth_mean: decimal_positive
    pre_retirement_mean_rate_of_return: decimal_positive
    post_retirement_mean_rate_of_return: decimal_positive
    pre_retirement_rate_of_return_volatility: decimal_positive
    post_retirement_rate_of_return_volatility: decimal_positive
    post_retirement_tax_rate: decimal_positive
    additional_post_retirement_annual_income: decimal_positive
