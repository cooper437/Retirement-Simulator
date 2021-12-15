import os
from dotenv import load_dotenv
from decimal import Decimal

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

# Portfolio Parameters
INITIAL_PORTFOLIO_AMOUNT = Decimal(os.getenv('INITIAL_PORTFOLIO_AMOUNT')) if os.getenv(
    'INITIAL_PORTFOLIO_AMOUNT') is not None else Decimal(20000)
PRE_RETIREMENT_ANNUAL_CONTRIBUTION = Decimal(
    os.getenv('PRE_RETIREMENT_ANNUAL_CONTRIBUTION')) if os.getenv(
    'PRE_RETIREMENT_ANNUAL_CONTRIBUTION') is not None else Decimal(30000)
POST_RETIREMENT_ANNUAL_CONTRIBUTION = Decimal(
    os.getenv('POST_RETIREMENT_ANNUAL_CONTRIBUTION')) if os.getenv(
    'POST_RETIREMENT_ANNUAL_CONTRIBUTION') is not None else Decimal(-100000)  # Must be a negative number

# Lifestyle Parameters
CURRENT_AGE = os.getenv('CURRENT_AGE') or 22
RETIREMENT_AGE = os.getenv('RETIREMENT_AGE') or 65
LIFE_EXPECTANCY = os.getenv('LIFE_EXPECTANCY') or 85

# Market Condition Parameters
INFLATION_MEAN = Decimal(os.getenv('INFLATION_MEAN')) if os.getenv(
    'INFLATION_MEAN') is not None else Decimal(0.027)
WAGE_GROWTH_MEAN = Decimal(os.getenv('WAGE_GROWTH_MEAN')) if os.getenv(
    'WAGE_GROWTH_MEAN') is not None else Decimal(0.03)
PRE_RETIREMENT_MEAN_RATE_OF_RETURN = Decimal(
    os.getenv('PRE_RETIREMENT_MEAN_RATE_OF_RETURN')) if os.getenv(
    'PRE_RETIREMENT_MEAN_RATE_OF_RETURN') is not None else Decimal(0.095)
POST_RETIREMENT_MEAN_RATE_OF_RETURN = Decimal(
    os.getenv('POST_RETIREMENT_MEAN_RATE_OF_RETURN')) if os.getenv(
    'POST_RETIREMENT_MEAN_RATE_OF_RETURN') is not None else Decimal(0.055)
PRE_RETIREMENT_RATE_OF_RETURN_VOLATILITY = Decimal(
    os.getenv('PRE_RETIREMENT_RATE_OF_RETURN_VOLATILITY')) if os.getenv(
    'PRE_RETIREMENT_RATE_OF_RETURN_VOLATILITY') is not None else Decimal(0.1429)
POST_RETIREMENT_RATE_OF_RETURN_VOLATILITY = Decimal(
    os.getenv('POST_RETIREMENT_RATE_OF_RETURN_VOLATILITY')) if os.getenv(
    'POST_RETIREMENT_RATE_OF_RETURN_VOLATILITY') is not None else Decimal(0.0477)

# Taxation
POST_RETIREMENT_TAX_RATE = Decimal(os.getenv('POST_RETIREMENT_TAX_RATE')) if os.getenv(
    'POST_RETIREMENT_TAX_RATE') is not None else Decimal(0.35)
