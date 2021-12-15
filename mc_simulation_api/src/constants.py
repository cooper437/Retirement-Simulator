import os
from dotenv import load_dotenv

from src.utils import null_safe_lowercase

load_dotenv()

DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS = os.getenv('DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS') or 2
# Adjusts the portfolio balance each year both pre and post retirement based on the inflation_mean to reflect value in todays dollars
ADJUST_PORTFOLIO_BALANCE_FOR_INFLATION = False if null_safe_lowercase(os.getenv(
    'ADJUST_PORTFOLIO_BALANCE_FOR_INFLATION')) == 'false' else True
# Accounts for the wage_growth_mean in the annual amount contributed pre-retirement
ADJUST_CONTRIBUTIONS_FOR_WAGE_GROWTH = False if null_safe_lowercase(os.getenv(
    'ADJUST_CONTRIBUTIONS_FOR_WAGE_GROWTH')) == 'false' else True
# Accounts for the inflation_mean in the annual amount withdrawn post-retirement
ADJUST_WITHDRAWALS_FOR_INFLATION = False if null_safe_lowercase(os.getenv(
    'ADJUST_WITHDRAWALS_FOR_INFLATION')) == 'false' else True
# Accounts for the post_retirement_tax_rate in the annual amount withdrawn post-retirement
ADJUST_WITHDRAWALS_FOR_TAXATION = False if null_safe_lowercase(os.getenv(
    'ADJUST_WITHDRAWALS_FOR_TAXATION')) == 'false' else True
