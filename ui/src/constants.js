/* eslint-disable import/prefer-default-export */
export const INVESTMENT_STYLE_ENUM = {
  aggresive: {
    label: 'Aggressive',
    value: 'aggresive',
    preRetirementMeanRateOfReturn: '9.50',
    postRetirementMeanRateOfReturn: '9.50',
    preRetirementRateOfReturnVolatility: '14.29',
    postRetirementRateOfReturnVolatility: '8.70'
  },
  modAggresive: {
    label: 'Moderate Aggressive',
    value: 'modAggresive',
    preRetirementMeanRateOfReturn: '8.00',
    postRetirementMeanRateOfReturn: '8.00',
    preRetirementRateOfReturnVolatility: '11.29',
    postRetirementRateOfReturnVolatility: '7.70'
  },
  moderate: {
    label: 'Moderate',
    value: 'moderate',
    preRetirementMeanRateOfReturn: '5.80',
    postRetirementMeanRateOfReturn: '5.80',
    preRetirementRateOfReturnVolatility: '9.29',
    postRetirementRateOfReturnVolatility: '6.30'
  },
  conservative: {
    label: 'Conservative',
    value: 'conservative',
    preRetirementMeanRateOfReturn: '4.00',
    postRetirementMeanRateOfReturn: '4.00',
    preRetirementRateOfReturnVolatility: '5.89',
    postRetirementRateOfReturnVolatility: '3.20'
  }
};

export const TAX_BRACKETS_ENUM = {
  singleFiler: [
    { rangeBottom: 0, rangeTop: 10275, taxRate: 0.1 },
    { rangeBottom: 10276, rangeTop: 41775, taxRate: 0.12 },
    { rangeBottom: 41776, rangeTop: 89075, taxRate: 0.22 },
    { rangeBottom: 89076, rangeTop: 170050, taxRate: 0.24 },
    { rangeBottom: 170051, rangeTop: 215950, taxRate: 0.32 },
    { rangeBottom: 215951, rangeTop: 539900, taxRate: 0.35 },
    { rangeBottom: 539901, rangeTop: null, taxRate: 0.37 }
  ],
  marriedFilingJointly: [
    { rangeBottom: 0, rangeTop: 20500, taxRate: 0.1 },
    { rangeBottom: 20501, rangeTop: 83550, taxRate: 0.12 },
    { rangeBottom: 83551, rangeTop: 178150, taxRate: 0.22 },
    { rangeBottom: 178151, rangeTop: 340100, taxRate: 0.24 },
    { rangeBottom: 340101, rangeTop: 431900, taxRate: 0.32 },
    { rangeBottom: 431901, rangeTop: 647850, taxRate: 0.35 },
    { rangeBottom: 647851, rangeTop: null, taxRate: 0.37 }
  ],
  marriedFilingSeparately: [
    { rangeBottom: 0, rangeTop: 10275, taxRate: 0.1 },
    { rangeBottom: 10276, rangeTop: 41775, taxRate: 0.12 },
    { rangeBottom: 41776, rangeTop: 89075, taxRate: 0.22 },
    { rangeBottom: 89076, rangeTop: 170050, taxRate: 0.24 },
    { rangeBottom: 170051, rangeTop: 215950, taxRate: 0.32 },
    { rangeBottom: 215951, rangeTop: 323925, taxRate: 0.35 },
    { rangeBottom: 323926, rangeTop: null, taxRate: 0.37 }
  ]
};

export const QUESTIONNAIRE_STEPS = {
  lifestylePlanning: {
    stepNumber: 1,
    stepName: 'lifestylePlanning'
  },
  currentLifestyle: {
    stepNumber: 2,
    stepName: 'currentLifestyle'
  },
  currentPortfolioAndIncome: {
    stepNumber: 3,
    stepName: 'currentPortfolioAndIncome'
  },
  retirementExpectations: {
    stepNumber: 4,
    stepName: 'retirementExpectations'
  }
};

export const ACCOUNT_TYPES_ENUM = {
  '401k': {
    label: '401k',
    value: '401k'
  },
  ira: {
    label: 'IRA',
    value: 'ira'
  }
};
