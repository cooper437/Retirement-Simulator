import numpy as np
from decimal import Decimal

from src.constants import NUMBER_OF_SIMULATIONS


def sample_normal_distribution(
        mean: float, standard_deviation: float, sample_size: int) -> np.ndarray:
    sample = np.random.normal(mean, standard_deviation, sample_size)
    sample.sort()
    return sample


def get_random_sample_pairs(years_until_retirement: int,
                            years_from_retirement_until_life_expectancy: int,
                            pre_retirement_mean_rate_of_return: Decimal,
                            pre_retirement_rate_of_return_volatility: Decimal,
                            post_retirement_mean_rate_of_return: Decimal,
                            post_retirement_rate_of_return_volatility: Decimal
                            ):
    samples = []
    for _ in range(NUMBER_OF_SIMULATIONS):
        pre_retirement_rors = sample_normal_distribution(
            mean=pre_retirement_mean_rate_of_return,
            standard_deviation=pre_retirement_rate_of_return_volatility,
            sample_size=years_until_retirement)
        post_retirement_rors = sample_normal_distribution(
            mean=post_retirement_mean_rate_of_return,
            standard_deviation=post_retirement_rate_of_return_volatility,
            sample_size=years_from_retirement_until_life_expectancy)
        pre_retirement_ror_random = pre_retirement_rors.mean()
        post_retirement_ror_random = post_retirement_rors.mean()
        samples.append((pre_retirement_ror_random, post_retirement_ror_random))
    return samples
