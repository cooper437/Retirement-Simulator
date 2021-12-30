/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const submitRetirementSimulationForm = async () => {
  const formParams = {
    adjust_portfolio_balance_for_inflation: true,
    adjust_contributions_for_income_growth: true,
    adjust_withdrawals_for_inflation: true,
    adjust_withdrawals_for_taxation: true,
    initial_portfolio_amount: 100000,
    pre_retirement_annual_contribution: 20000,
    post_retirement_annual_withdrawal: -100000,
    current_age: 30,
    retirement_age: 65,
    life_expectancy: 90,
    inflation_mean: 0.027,
    income_growth_mean: 0.03,
    pre_retirement_mean_rate_of_return: 0.08,
    post_retirement_mean_rate_of_return: 0.055,
    pre_retirement_rate_of_return_volatility: 0.1429,
    post_retirement_rate_of_return_volatility: 0.0477,
    post_retirement_tax_rate: 0.35,
    additional_post_retirement_annual_income: 55000.0
  };
  try {
    const response = await axios.post('/simulate', formParams);
    console.log('response', response.data);
  } catch (err) {
    console.error('An error occured');
  }
};
