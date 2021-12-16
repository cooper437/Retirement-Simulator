import numpy as np

from src.constants import (
    PRE_RETIREMENT_MEAN_RATE_OF_RETURN,
    POST_RETIREMENT_MEAN_RATE_OF_RETURN,
    PRE_RETIREMENT_RATE_OF_RETURN_VOLATILITY,
    POST_RETIREMENT_RATE_OF_RETURN_VOLATILITY,
    NUMBER_OF_SIMULATIONS
)


def sample_normal_distribution(
        mean: float, standard_deviation: float, sample_size: int) -> np.ndarray:
    sample = np.random.normal(mean, standard_deviation, sample_size)
    sample.sort()
    return sample


def get_random_sample_pairs(years_until_retirement: int,
                            years_from_retirement_until_life_expectancy: int):
    samples = []
    for _ in range(NUMBER_OF_SIMULATIONS):
        pre_retirement_rors = sample_normal_distribution(
            mean=PRE_RETIREMENT_MEAN_RATE_OF_RETURN,
            standard_deviation=PRE_RETIREMENT_RATE_OF_RETURN_VOLATILITY,
            sample_size=years_until_retirement)
        post_retirement_rors = sample_normal_distribution(
            mean=POST_RETIREMENT_MEAN_RATE_OF_RETURN,
            standard_deviation=POST_RETIREMENT_RATE_OF_RETURN_VOLATILITY,
            sample_size=years_from_retirement_until_life_expectancy)
        pre_retirement_ror_random = pre_retirement_rors.mean()
        post_retirement_ror_random = post_retirement_rors.mean()
        samples.append((pre_retirement_ror_random, post_retirement_ror_random))
    return samples
