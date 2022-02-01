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
        pre_retirement_ror_random = Decimal(pre_retirement_rors.mean())
        post_retirement_ror_random = Decimal(post_retirement_rors.mean())
        samples.append((pre_retirement_ror_random, post_retirement_ror_random))
    return samples


def calc_weighted_average_ror(
        years_until_retirement: int,
        years_from_retirement_until_life_expectancy: int,
        simulation_duration: int,
        pre_retirement_mean_rate_of_return: Decimal,
        post_retirement_mean_rate_of_return: Decimal) -> Decimal:
    pre_retirement_weight = Decimal(
        years_until_retirement / simulation_duration)
    post_retirement_weight = Decimal(
        years_from_retirement_until_life_expectancy / simulation_duration)
    weighted_avg_ror = np.average(
        [pre_retirement_mean_rate_of_return,
         post_retirement_mean_rate_of_return],
        weights=[pre_retirement_weight, post_retirement_weight])
    return weighted_avg_ror
