import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem,
  TextField
} from '@mui/material';
import NumberFormatPercentage from '../../NumberFormatPercentage';
import { INVESTMENT_STYLE_ENUM } from '../../../constants';

export default function MarketConditionsFormContent({
  commonFormStyles,
  preRetirementMeanRateOfReturn,
  postRetirementMeanRateOfReturn,
  preRetirementInvestmentStyle,
  postRetirementInvestmentStyle,
  inflationMean,
  incomeGrowthMean,
  setPreRetirementMeanRateOfReturn,
  setPostRetirementMeanRateOfReturn,
  setPreRetirementInvestmentStyle,
  setPostRetirementInvestmentStyle,
  setInflationMean,
  setIncomeGrowthMean,
  adjustPortfolioBalanceForInflation,
  adjustContributionsForIncomeGrowth,
  adjustWithdrawalsForInflation
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
          <InputLabel id="pre-retirement-investment-style-label">
            Pre-Retirement Investment Style
          </InputLabel>
          <Select
            labelId="pre-retirement-investment-style-label"
            id="pre-retirement-investment-style"
            label="Pre-Retirement Investment Style"
            startAdornment={<InputAdornment position="start" />}
            endAdornment={<InputAdornment position="end" />}
            value={preRetirementInvestmentStyle}
            onChange={(e) => {
              const selection = Object.values(INVESTMENT_STYLE_ENUM).find(
                (i) => i.label === e.target.value
              );
              setPreRetirementInvestmentStyle(
                e.target.value,
                selection.preRetirementMeanRateOfReturn
              );
            }}
          >
            {Object.values(INVESTMENT_STYLE_ENUM).map((i) => (
              <MenuItem key={i.value} value={i.label}>
                {i.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={commonFormStyles.shortFormInput}>
          <InputLabel id="post-retirement-investment-style-label">
            Post-Retirement Investment Style
          </InputLabel>
          <Select
            labelId="post-retirement-investment-style-label"
            id="post-retirement-investment-style"
            label="Post-Retirement Investment Style"
            startAdornment={<InputAdornment position="start" />}
            endAdornment={<InputAdornment position="end" />}
            value={postRetirementInvestmentStyle}
            onChange={(e) => {
              const selection = Object.values(INVESTMENT_STYLE_ENUM).find(
                (i) => i.label === e.target.value
              );
              setPostRetirementInvestmentStyle(
                e.target.value,
                selection.postRetirementMeanRateOfReturn
              );
            }}
          >
            {Object.values(INVESTMENT_STYLE_ENUM).map((i) => (
              <MenuItem key={i.value} value={i.label}>
                {i.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {(adjustPortfolioBalanceForInflation ||
          adjustWithdrawalsForInflation) && (
          <FormControl sx={commonFormStyles.shortFormInput}>
            <TextField
              label="Annual Inflation Mean"
              variant="outlined"
              value={inflationMean}
              onChange={(e) => setInflationMean(e.target.value)}
              name="inflation-mean"
              id="inflation-mean"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                inputComponent: NumberFormatPercentage,
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
            />
          </FormControl>
        )}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <FormControl sx={commonFormStyles.shortFormInput}>
          <TextField
            label="Pre-Retirement Rate of Return"
            variant="outlined"
            value={preRetirementMeanRateOfReturn}
            onChange={(e) => setPreRetirementMeanRateOfReturn(e.target.value)}
            name="pre-retirement-ror"
            id="pre-retirement-ror"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputComponent: NumberFormatPercentage,
              endAdornment: <InputAdornment position="end">%</InputAdornment>
            }}
          />
        </FormControl>
        <FormControl sx={commonFormStyles.shortFormInput}>
          <TextField
            label="Post-Retirement Rate of Return"
            variant="outlined"
            value={postRetirementMeanRateOfReturn}
            onChange={(e) => setPostRetirementMeanRateOfReturn(e.target.value)}
            name="post-retirement-ror"
            id="post-retirement-ror"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputComponent: NumberFormatPercentage,
              endAdornment: <InputAdornment position="end">%</InputAdornment>
            }}
          />
        </FormControl>
        {adjustContributionsForIncomeGrowth && (
          <FormControl sx={commonFormStyles.shortFormInput}>
            <TextField
              label="Annual Income Growth Mean"
              variant="outlined"
              value={incomeGrowthMean}
              onChange={(e) => setIncomeGrowthMean(e.target.value)}
              name="income-growth-mean"
              id="income-growth-mean"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                inputComponent: NumberFormatPercentage,
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
            />
          </FormControl>
        )}
      </Box>
    </>
  );
}
