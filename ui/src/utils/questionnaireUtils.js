import _ from 'lodash';
import {
  BASE_INCOME_TYPES_ENUM,
  INVESTMENT_STYLE_ENUM,
  CONTRIBUTION_STYLES
} from '../constants';
import { calcPostRetirementAnnualIncomeAndTaxRate } from './generalUtils';

/**
 * Return a copy of an array with one of the elements bumped to the last position
 * @param {*} anArray
 * @param {*} elementToMove
 * @returns
 */
export const reorderNthArrayElementToLast = (anArray, elementToMove) => {
  const aCopy = [...anArray];
  aCopy.push(
    aCopy.splice(
      aCopy.findIndex((i) => i.value === elementToMove.value),
      1
    )[0]
  );
  return aCopy;
};

export const calcTotalCurrentIncome = ({
  currentAnnualHouseHoldIncome,
  currentDiscretionaryIncome
}) =>
  parseInt(currentAnnualHouseHoldIncome, 10) +
  parseInt(currentDiscretionaryIncome, 10);

/**
 * Calcualte the desired base income represented as a fixed dollar amount
 * taking into account the users selections of either a percentage or fixed amount.
 * @param {*} param0
 * @returns
 */
export const calcDesiredBaseIncomeFixedAmount = ({
  formValues,
  currentDiscretionaryIncome,
  currentAnnualHouseHoldIncome
}) => {
  const totalCurrentIncome = calcTotalCurrentIncome({
    currentDiscretionaryIncome,
    currentAnnualHouseHoldIncome
  });
  let desiredBaseIncomeFixedAmount;
  if (
    formValues.desiredBaseIncomeType ===
    BASE_INCOME_TYPES_ENUM.fixedAmount.value
  ) {
    desiredBaseIncomeFixedAmount = formValues.desiredBaseIncomeFixedAmount;
  }
  if (
    formValues.desiredBaseIncomeType ===
      BASE_INCOME_TYPES_ENUM.percentage.value &&
    formValues.desiredBaseIncomePercentage
  ) {
    const desiredBaseIncomeFixedAmountAsNumber = parseInt(
      totalCurrentIncome * formValues.desiredBaseIncomePercentage,
      10
    );
    desiredBaseIncomeFixedAmount =
      desiredBaseIncomeFixedAmountAsNumber.toString();
  }
  return desiredBaseIncomeFixedAmount;
};

/**
 * Calculates the total postRetirementAnnualIncome and associated postRetirementTaxRate
 * Note that this postRetirementAnnualIncome is inclusive of all income and does not
 * split income between withrawals and other supplementary income.
 */
export const calculateIncomeForTaxes = ({
  formValues,
  currentDiscretionaryIncome,
  currentAnnualHouseHoldIncome
}) => {
  let additionalPostRetirementAnnualIncome = '';
  const desiredBaseIncomeFixedAmount = calcDesiredBaseIncomeFixedAmount({
    formValues,
    currentDiscretionaryIncome,
    currentAnnualHouseHoldIncome
  });
  if (
    formValues.otherDiscretionaryIncomePostRetirement &&
    formValues.socialSecurityIncome
  ) {
    if (formValues.isPlanningOnRentingRealEstate === false) {
      const additionalPostRetirementAnnualIncomeAsNumber =
        parseInt(formValues.otherDiscretionaryIncomePostRetirement, 10) +
        parseInt(formValues.socialSecurityIncome, 10);
      additionalPostRetirementAnnualIncome =
        additionalPostRetirementAnnualIncomeAsNumber.toString();
    }
    if (
      formValues.isPlanningOnRentingRealEstate &&
      formValues.expectedRentalIncome &&
      formValues.expectedRentalExpenses
    ) {
      const netRentalIncome =
        parseInt(formValues.expectedRentalIncome, 10) -
        parseInt(formValues.expectedRentalExpenses, 10);
      const additionalPostRetirementAnnualIncomeAsNumber =
        parseInt(formValues.otherDiscretionaryIncomePostRetirement, 10) +
        parseInt(formValues.socialSecurityIncome, 10) +
        netRentalIncome;
      additionalPostRetirementAnnualIncome =
        additionalPostRetirementAnnualIncomeAsNumber.toString();
    }
  }
  const { postRetirementAnnualIncome, postRetirementTaxRate } =
    calcPostRetirementAnnualIncomeAndTaxRate({
      filingStatus: formValues.taxFilingStatus,
      postRetirementAnnualWithdrawal: desiredBaseIncomeFixedAmount,
      additionalPostRetirementAnnualIncome
    });
  return { postRetirementAnnualIncome, postRetirementTaxRate };
};

/**
 * Calculate the mean of the mean rates of return and volatility for all accounts the user entered in step 3
 * both pre and post retirement
 * @param {*} accounts
 * @returns
 */
const getMeanRateOfReturnForAllAccounts = (accounts) => {
  const allInvestingStyles = accounts.map((account) => account.investingStyle);
  const allPostRetirementRatesOfReturn = allInvestingStyles.map(
    (investingStyle) => {
      const asString = Object.values(INVESTMENT_STYLE_ENUM).find(
        (i) => i.value === investingStyle
      ).postRetirementMeanRateOfReturn;
      return parseFloat(asString) / 100;
    }
  );
  const allPreRetirementRatesOfReturn = allInvestingStyles.map(
    (investingStyle) => {
      const asString = Object.values(INVESTMENT_STYLE_ENUM).find(
        (i) => i.value === investingStyle
      ).preRetirementMeanRateOfReturn;
      return parseFloat(asString) / 100;
    }
  );
  const allPreRetirementRateOfReturnVolatility = allInvestingStyles.map(
    (investingStyle) => {
      const asString = Object.values(INVESTMENT_STYLE_ENUM).find(
        (i) => i.value === investingStyle
      ).preRetirementRateOfReturnVolatility;
      return parseFloat(asString) / 100;
    }
  );
  const allPostRetirementRateOfReturnVolatility = allInvestingStyles.map(
    (investingStyle) => {
      const asString = Object.values(INVESTMENT_STYLE_ENUM).find(
        (i) => i.value === investingStyle
      ).postRetirementRateOfReturnVolatility;
      return parseFloat(asString) / 100;
    }
  );
  const postRetirementMeanRateOfReturn = _.mean(allPostRetirementRatesOfReturn);
  const preRetirementMeanRateOfReturn = _.mean(allPreRetirementRatesOfReturn);
  const preRetirementRateOfReturnVolatility = _.mean(
    allPreRetirementRateOfReturnVolatility
  );
  const postRetirementRateOfReturnVolatility = _.mean(
    allPostRetirementRateOfReturnVolatility
  );
  return {
    postRetirementMeanRateOfReturn,
    preRetirementMeanRateOfReturn,
    preRetirementRateOfReturnVolatility,
    postRetirementRateOfReturnVolatility
  };
};

// eslint-disable-next-line arrow-body-style
export const constructFinalPayload = (allFormValuesGroupedByStep) => {
  // Consolidate them all into object so its easier to reference
  const allFormValues = {
    ...allFormValuesGroupedByStep.stepOne,
    ...allFormValuesGroupedByStep.stepTwo,
    ...allFormValuesGroupedByStep.stepThree,
    ...allFormValuesGroupedByStep.stepFour
  };
  const allAccountBalances = allFormValues.accounts.map((i) =>
    parseInt(i.portfolioBalance, 10)
  );
  let fixedAmountPreRetirementContribution;
  if (
    allFormValues.contributionStyle === CONTRIBUTION_STYLES.fixedAmount.value
  ) {
    fixedAmountPreRetirementContribution = parseInt(
      allFormValues.annualizedFixedIncomeContribution,
      10
    );
  }
  if (
    allFormValues.contributionStyle === CONTRIBUTION_STYLES.percentage.value
  ) {
    const percentIncome =
      parseFloat(allFormValues.annualizedPercentIncomeContribution, 10) / 100;
    const baseIncome = parseInt(allFormValues.currentAnnualHouseHoldIncome, 10);
    fixedAmountPreRetirementContribution = parseInt(
      baseIncome * percentIncome,
      10
    );
  }
  const sumReducer = (previousValue, currentValue) =>
    previousValue + currentValue;
  const totalAccountBalance = allAccountBalances.reduce(sumReducer);
  const { postRetirementAnnualIncome, postRetirementTaxRate } =
    calculateIncomeForTaxes({
      formValues: allFormValuesGroupedByStep.stepFour,
      currentDiscretionaryIncome: allFormValues.currentDiscretionaryIncome,
      currentAnnualHouseHoldIncome: allFormValues.currentAnnualHouseHoldIncome
    });
  let incomeGrowthMean = 0.027;
  if (
    allFormValues.contributionStyle === CONTRIBUTION_STYLES.fixedAmount.value &&
    allFormValues.isFixedContributionTypicalGrowthExpected === false
  ) {
    incomeGrowthMean = 0.0;
  }
  const {
    postRetirementMeanRateOfReturn,
    preRetirementMeanRateOfReturn,
    preRetirementRateOfReturnVolatility,
    postRetirementRateOfReturnVolatility
  } = getMeanRateOfReturnForAllAccounts(allFormValues.accounts);
  const payload = {
    adjustPortfolioBalanceForInflation: true,
    adjustContributionsForIncomeGrowth: true,
    adjustWithdrawalsForInflation: true,
    adjustWithdrawalsForTaxation: true,
    initialPortfolioAmount: totalAccountBalance,
    preRetirementAnnualContribution: fixedAmountPreRetirementContribution,
    postRetirementAnnualWithdrawal: -postRetirementAnnualIncome,
    currentAge: allFormValues.currentAge,
    retirementAge: allFormValues.retirementAge,
    lifeExpectancy: allFormValues.lifeExpectancy,
    inflationMean: 0.024,
    incomeGrowthMean,
    postRetirementTaxRate: parseFloat(postRetirementTaxRate) / 100,
    postRetirementMeanRateOfReturn,
    preRetirementMeanRateOfReturn,
    preRetirementRateOfReturnVolatility,
    postRetirementRateOfReturnVolatility,
    additionalPostRetirementAnnualIncome: 0.0
  };
  return payload;
};
