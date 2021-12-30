import React from 'react';
import { Box, FormControl, InputAdornment, TextField } from '@mui/material';
import NumberFormatDollarAmount from '../../NumberFormatDollarAmount';

export default function PortfolioFormContent({
  commonFormStyles,
  initialPortfolioAmount,
  preRetirementAnnualContribution,
  postRetirementAnnualWithdrawal,
  setInitialPortfolioAmount,
  setPreRetirementAnnualContribution,
  setPostRetirementAnnualWithdrawal,
  additionalPostRetirementAnnualIncome,
  setAdditionalPostRetirementAnnualIncome
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
            onChange={(e) => setInitialPortfolioAmount(e.target.value)}
            name="initial-portfolio-amount"
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
          />
        </FormControl>
        <FormControl sx={commonFormStyles.shortFormInput}>
          <TextField
            label="Annual Contribution Pre-Retirement"
            variant="outlined"
            value={preRetirementAnnualContribution}
            onChange={(e) => setPreRetirementAnnualContribution(e.target.value)}
            name="annual-contribution-pre-retirement"
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
          />
        </FormControl>
        <FormControl sx={commonFormStyles.shortFormInput}>
          <TextField
            label="Annual Net Withdrawal Post-Retirement"
            variant="outlined"
            value={postRetirementAnnualWithdrawal}
            onChange={(e) => setPostRetirementAnnualWithdrawal(e.target.value)}
            name="annual-withdrawal-post-retirement"
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
            onChange={(e) =>
              setAdditionalPostRetirementAnnualIncome(e.target.value)
            }
            name="additional-annual-income"
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
          />
        </FormControl>
      </Box>
    </>
  );
}
