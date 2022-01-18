import React from 'react';
import {
  Box,
  FormControl,
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import NumberFormatDollarAmount from '../../NumberFormatDollarAmount';
import NumberFormatPercentage from '../../NumberFormatPercentage';
import { INVESTMENT_STYLE_ENUM } from '../../../constants';

export default function PortfolioFormContent({
  commonFormStyles,
  initialPortfolioAmount,
  preRetirementAnnualContribution,
  adjustContributionsForIncomeGrowth,
  incomeGrowthMean,
  touched,
  errors,
  handleChange,
  preRetirementMeanRateOfReturn,
  preRetirementInvestmentStyle,
  setFieldValue
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
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <FormControl sx={{ ...commonFormStyles.shortFormInput }}>
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
        <FormGroup sx={{ justifyContent: 'center' }}>
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
        {adjustContributionsForIncomeGrowth ? (
          <Box>
            <FormControl sx={{ ...commonFormStyles.shortFormInput }}>
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
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  )
                }}
                error={
                  touched.incomeGrowthMean && Boolean(errors.incomeGrowthMean)
                }
                helperText={touched.incomeGrowthMean && errors.incomeGrowthMean}
              />
            </FormControl>
          </Box>
        ) : (
          <Box sx={{ width: '259px' }} />
        )}
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Box sx={{ flex: 1 }}>
          <FormControl
            sx={commonFormStyles.shortFormInput}
            error={
              touched.preRetirementInvestmentStyle &&
              Boolean(errors.preRetirementInvestmentStyle)
            }
          >
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
              name="preRetirementInvestmentStyle"
              onChange={async (e) => {
                const selection = Object.values(INVESTMENT_STYLE_ENUM).find(
                  (i) => i.label === e.target.value
                );
                await handleChange(e);
                setFieldValue(
                  'preRetirementMeanRateOfReturn',
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
            <FormHelperText>
              {touched.preRetirementInvestmentStyle &&
                errors.preRetirementInvestmentStyle}
            </FormHelperText>
          </FormControl>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <FormControl sx={commonFormStyles.shortFormInput}>
            <TextField
              label="Pre-Retirement Rate of Return"
              variant="outlined"
              value={preRetirementMeanRateOfReturn}
              onChange={handleChange}
              name="preRetirementMeanRateOfReturn"
              id="pre-retirement-ror"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                inputComponent: NumberFormatPercentage,
                endAdornment: <InputAdornment position="end">%</InputAdornment>
              }}
              error={
                touched.preRetirementMeanRateOfReturn &&
                Boolean(errors.preRetirementMeanRateOfReturn)
              }
              helperText={
                touched.preRetirementMeanRateOfReturn &&
                errors.preRetirementMeanRateOfReturn
              }
            />
          </FormControl>
        </Box>
        <Box sx={{ flex: 1 }} />
      </Box>
    </>
  );
}
