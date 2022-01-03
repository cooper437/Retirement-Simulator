/* eslint-disable import/prefer-default-export */
import { TAX_BRACKETS_ENUM } from '../constants';
/**
 * Get the tax rate given the filing status and annual income
 */
export const determineTaxRate = ({ filingStatus, annualIncome }) => {
  const bracketsForFilingStatus = TAX_BRACKETS_ENUM[filingStatus];
  if (!bracketsForFilingStatus) throw new Error('Invalid filingStatus');
  const bracketForIncomeIndex = bracketsForFilingStatus.findIndex((i) => {
    const isAboveBottomRange = annualIncome >= i.rangeBottom;
    const isBelowTopRange = i.rangeTop == null || annualIncome <= i.rangeTop;
    return isAboveBottomRange && isBelowTopRange;
  });
  if (bracketForIncomeIndex === -1)
    throw new Error('Invalid annualIncome value');
  const { taxRate } = bracketsForFilingStatus[bracketForIncomeIndex];
  return taxRate;
};

export const decimalToPercent = (aDecimal) => {
  const asPercent = aDecimal * 100;
  const rounded = Math.round(asPercent * 100) / 100;
  return `${rounded}%`;
};
