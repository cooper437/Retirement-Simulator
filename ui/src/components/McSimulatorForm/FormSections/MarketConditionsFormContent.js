import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem
} from '@mui/material';

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
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <FormControl sx={commonFormStyles.shortFormInput}>
          <InputLabel shrink htmlFor="pre-retirement-ror">
            Pre-Retirement Rate of Return
          </InputLabel>
          <OutlinedInput
            id="pre-retirement-ror"
            inputProps={{
              style: { textAlign: 'right' }
            }}
            startAdornment={<InputAdornment position="start" />}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            label="Pre-Retirement Rate of Return"
            value={preRetirementMeanRateOfReturn}
            onChange={(e) =>
              setPreRetirementMeanRateOfReturn(parseInt(e.target.value, 10))
            }
          />
        </FormControl>
        <FormControl sx={commonFormStyles.shortFormInput}>
          <InputLabel shrink htmlFor="post-retirement-ror">
            Post-Retirement Rate of Return
          </InputLabel>
          <OutlinedInput
            id="post-retirement-ror"
            inputProps={{
              style: { textAlign: 'right' }
            }}
            startAdornment={<InputAdornment position="start" />}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            label="Post-Retirement Rate of Return"
            value={postRetirementMeanRateOfReturn}
            onChange={(e) =>
              setPostRetirementMeanRateOfReturn(parseInt(e.target.value, 10))
            }
          />
        </FormControl>
        {(adjustPortfolioBalanceForInflation ||
          adjustWithdrawalsForInflation) && (
          <FormControl sx={commonFormStyles.shortFormInput}>
            <InputLabel shrink htmlFor="inflation-mean">
              Annual Inflation Mean
            </InputLabel>
            <OutlinedInput
              id="inflation-mean"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                style: { textAlign: 'right' }
              }}
              startAdornment={<InputAdornment position="start" />}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              label="Annual Inflation Mean"
              value={inflationMean}
              onChange={(e) => setInflationMean(parseInt(e.target.value, 10))}
            />
          </FormControl>
        )}
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
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
            onChange={(e) => setPreRetirementInvestmentStyle(e.target.value)}
          >
            <MenuItem value="aggressive">Aggressive</MenuItem>
            <MenuItem value="moderate-agressive">Moderate Aggressive</MenuItem>
            <MenuItem value="moderate">Moderate</MenuItem>
            <MenuItem value="conservative">Conservative</MenuItem>
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
            onChange={(e) => setPostRetirementInvestmentStyle(e.target.value)}
          >
            <MenuItem value="aggressive">Aggressive</MenuItem>
            <MenuItem value="moderate-agressive">Moderate Aggressive</MenuItem>
            <MenuItem value="moderate">Moderate</MenuItem>
            <MenuItem value="conservative">Conservative</MenuItem>
          </Select>
        </FormControl>
        {adjustContributionsForIncomeGrowth && (
          <FormControl sx={commonFormStyles.shortFormInput}>
            <InputLabel shrink htmlFor="income-growth-mean">
              Annual Income Growth Mean
            </InputLabel>
            <OutlinedInput
              id="income-growth-mean"
              InputLabelProps={{ shrink: true }}
              inputProps={{
                style: { textAlign: 'right' }
              }}
              startAdornment={<InputAdornment position="start" />}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              label="Annual Income Growth Mean"
              value={incomeGrowthMean}
              onChange={(e) =>
                setIncomeGrowthMean(parseInt(e.target.value, 10))
              }
            />
          </FormControl>
        )}
      </Box>
    </>
  );
}
