import numpy as np

from src.constants import (
    PRE_RETIREMENT_MEAN_RATE_OF_RETURN,
    POST_RETIREMENT_MEAN_RATE_OF_RETURN,
    PRE_RETIREMENT_RATE_OF_RETURN_VOLATILITY,
    POST_RETIREMENT_RATE_OF_RETURN_VOLATILITY,
    DISTRIBUTION_SAMPLE_SIZE,
    NUMBER_OF_SIMULATIONS
)


def sample_normal_distribution(
        mean: float, standard_deviation: float, sample_size: int) -> np.ndarray:
    sample = np.random.normal(mean, standard_deviation, sample_size)
    sample.sort()
    return sample


def get_sample_distrbutions():
    pre_retirement_rates_of_return = sample_normal_distribution(
        mean=PRE_RETIREMENT_MEAN_RATE_OF_RETURN,
        standard_deviation=PRE_RETIREMENT_RATE_OF_RETURN_VOLATILITY,
        sample_size=DISTRIBUTION_SAMPLE_SIZE)
    post_retirement_rates_of_return = sample_normal_distribution(
        mean=POST_RETIREMENT_MEAN_RATE_OF_RETURN,
        standard_deviation=POST_RETIREMENT_RATE_OF_RETURN_VOLATILITY,
        sample_size=DISTRIBUTION_SAMPLE_SIZE)
    return (pre_retirement_rates_of_return, post_retirement_rates_of_return)


def get_random_sample_pairs():
    samples = []
    pre_retirement_rates_of_return, post_retirement_rates_of_return = get_sample_distrbutions()
    for _ in range(NUMBER_OF_SIMULATIONS):
        pre_retirement_ror_random = np.random.choice(pre_retirement_rates_of_return)
        post_retirement_ror_random = np.random.choice(post_retirement_rates_of_return)
        samples.append((pre_retirement_ror_random, post_retirement_ror_random))
    return samples
