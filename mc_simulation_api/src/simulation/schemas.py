from typing import Dict
from pydantic import (BaseModel,
                      PositiveInt,
                      NegativeInt,
                      condecimal
                      )

decimal_positive = condecimal(ge=0)


class RunSimulationIn(BaseModel):
    # Adjusts the portfolio balance each year both pre and post retirement based on the inflation_mean to reflect value in todays dollars
    adjust_portfolio_balance_for_inflation: bool
    # Accounts for the wage_growth_mean in the annual amount contributed pre-retirement
    adjust_contributions_for_income_growth: bool
    # Accounts for the wage_growth_mean in the annual amount contributed pre-retirement
    adjust_withdrawals_for_inflation: bool
    # Accounts for the post_retirement_tax_rate in the annual amount withdrawn post-retirement
    adjust_withdrawals_for_taxation: bool
    # Portfolio Parameters
    initial_portfolio_amount: PositiveInt
    pre_retirement_annual_contribution: PositiveInt
    post_retirement_annual_withdrawal: NegativeInt
    # Lifestyle Parameters
    current_age: PositiveInt
    retirement_age: PositiveInt
    life_expectancy: PositiveInt
    # Market Condition Parameters
    inflation_mean: decimal_positive
    income_growth_mean: decimal_positive
    pre_retirement_mean_rate_of_return: decimal_positive
    post_retirement_mean_rate_of_return: decimal_positive
    pre_retirement_rate_of_return_volatility: decimal_positive
    post_retirement_rate_of_return_volatility: decimal_positive
    # Taxation
    post_retirement_tax_rate: decimal_positive
    additional_post_retirement_annual_income: decimal_positive


class QuantileStatistic(BaseModel):
    pre_retirement_rate_of_return: decimal_positive
    post_retirement_rate_of_return: decimal_positive
    balance_at_eol: decimal_positive


class RunSimulationOut(BaseModel):
    survival_rate: decimal_positive
    number_of_simulations: PositiveInt
    quantile_statistics: Dict[str, QuantileStatistic]
