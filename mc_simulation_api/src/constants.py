import os
from dotenv import load_dotenv
from decimal import Decimal

from src.utils import null_safe_lowercase

load_dotenv()

DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS = os.getenv(
    'DECIMAL_PRECISION_FOR_DOLLAR_AMOUNTS') or 2
NUMBER_OF_SIMULATIONS = int(os.getenv('NUMBER_OF_SIMULATIONS') or '5000')
