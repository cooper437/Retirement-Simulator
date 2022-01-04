import React from 'react';
import {
  Box,
  FormControl,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import NumberFormatDollarAmount from '../../NumberFormatDollarAmount';
import NumberFormatPercentage from '../../NumberFormatPercentage';

export default function PortfolioFormContent({
  commonFormStyles,
  initialPortfolioAmount,
  preRetirementAnnualContribution,
  postRetirementAnnualWithdrawal,
  additionalPostRetirementAnnualIncome,
  adjustContributionsForIncomeGrowth,
  incomeGrowthMean,
  touched,
  errors,
  handleChange
}) {
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <FormControl sx={commonFormStyles.shortFormInput}>
          <TextField
            label="Initial Amount"
            variant="outlined"
            value={initialPortfolioAmount}
            onChange={handleChange}
            name="initialPortfolioAmount"
            id="initial-portfolio-amount"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputComponent: NumberFormatDollarAmount,
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">.00</InputAdornment>
            }}
            error={
              touched.initialPortfolioAmount &&
              Boolean(errors.initialPortfolioAmount)
            }
            helperText={
              touched.initialPortfolioAmount && errors.initialPortfolioAmount
            }
          />
        </FormControl>
        <FormControl sx={commonFormStyles.shortFormInput}>
          <TextField
            label="Annual Contribution Pre-Retirement"
            variant="outlined"
            value={preRetirementAnnualContribution}
            onChange={handleChange}
            name="preRetirementAnnualContribution"
            id="annual-contribution-pre-retirement"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputComponent: NumberFormatDollarAmount,
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">.00</InputAdornment>
            }}
            error={
              touched.preRetirementAnnualContribution &&
              Boolean(errors.preRetirementAnnualContribution)
            }
            helperText={
              touched.preRetirementAnnualContribution &&
              errors.preRetirementAnnualContribution
            }
          />
        </FormControl>
        <FormControl sx={commonFormStyles.shortFormInput}>
          <TextField
            label="Annual Net Withdrawal Post-Retirement"
            variant="outlined"
            value={postRetirementAnnualWithdrawal}
            onChange={handleChange}
            name="postRetirementAnnualWithdrawal"
            id="annual-withdrawal-post-retirement"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputComponent: NumberFormatDollarAmount,
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">.00</InputAdornment>
            }}
            error={
              touched.postRetirementAnnualWithdrawal &&
              Boolean(errors.postRetirementAnnualWithdrawal)
            }
            helperText={
              touched.postRetirementAnnualWithdrawal &&
              errors.postRetirementAnnualWithdrawal
            }
          />
        </FormControl>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <FormControl sx={commonFormStyles.shortFormInput}>
          <TextField
            label="Post-Retirement Additional Annual Income"
            variant="outlined"
            value={additionalPostRetirementAnnualIncome}
            onChange={handleChange}
            name="additionalPostRetirementAnnualIncome"
            id="additional-annual-income"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputComponent: NumberFormatDollarAmount,
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">.00</InputAdornment>
            }}
            error={
              touched.additionalPostRetirementAnnualIncome &&
              Boolean(errors.additionalPostRetirementAnnualIncome)
            }
            helperText={
              touched.additionalPostRetirementAnnualIncome &&
              errors.additionalPostRetirementAnnualIncome
            }
          />
        </FormControl>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="flex-end"
        flexWrap="wrap"
        height="72px"
      >
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={adjustContributionsForIncomeGrowth}
                name="adjustContributionsForIncomeGrowth"
                onChange={handleChange}
              />
            }
            label="Adjust for Income Growth"
          />
        </FormGroup>
        {adjustContributionsForIncomeGrowth && (
          <FormControl sx={commonFormStyles.shortFormInput}>
            <TextField
              label="Annual Income Growth Mean"
              variant="outlined"
              value={incomeGrowthMean}
              onChange={handleChange}
              name="incomeGrowthMean"
              id="income-growth-mean"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                inputComponent: NumberFormatPercentage,
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
              error={
                touched.incomeGrowthMean && Boolean(errors.incomeGrowthMean)
              }
              helperText={touched.incomeGrowthMean && errors.incomeGrowthMean}
            />
          </FormControl>
        )}
      </Box>
    </>
  );
}
