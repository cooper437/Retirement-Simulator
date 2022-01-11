import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem,
  TextField,
  FormHelperText,
  Checkbox,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import NumberFormatPercentage from '../../NumberFormatPercentage';
import NumberFormatDollarAmount from '../../NumberFormatDollarAmount';
import { INVESTMENT_STYLE_ENUM } from '../../../constants';

export default function IncomeFormContent({
  commonFormStyles,
  preRetirementMeanRateOfReturn,
  postRetirementAnnualWithdrawal,
  postRetirementMeanRateOfReturn,
  preRetirementInvestmentStyle,
  postRetirementInvestmentStyle,
  additionalPostRetirementAnnualIncome,
  inflationMean,
  adjustForInflation,
  touched,
  errors,
  handleChange,
  setFieldValue
}) {
  return (
    <>
      {' '}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <FormControl sx={commonFormStyles.shortFormInput}>
          <TextField
            label="Post-Retirement Rate of Return"
            variant="outlined"
            value={postRetirementMeanRateOfReturn}
            onChange={handleChange}
            name="postRetirementMeanRateOfReturn"
            id="post-retirement-ror"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputComponent: NumberFormatPercentage,
              endAdornment: <InputAdornment position="end">%</InputAdornment>
            }}
            error={
              touched.postRetirementMeanRateOfReturn &&
              Boolean(errors.postRetirementMeanRateOfReturn)
            }
            helperText={
              touched.postRetirementMeanRateOfReturn &&
              errors.postRetirementMeanRateOfReturn
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
        height="72px"
        flexWrap="wrap"
      >
        <Box sx={{ flex: 1 }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={adjustForInflation}
                  name="adjustForInflation"
                  onChange={handleChange}
                />
              }
              label="Adjust for Inflation"
            />
          </FormGroup>
        </Box>
        {adjustForInflation && (
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <FormControl sx={commonFormStyles.shortFormInput}>
              <TextField
                label="Annual Inflation Mean"
                variant="outlined"
                value={inflationMean}
                name="inflationMean"
                onChange={handleChange}
                id="inflation-mean"
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  inputComponent: NumberFormatPercentage,
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  )
                }}
                error={touched.inflationMean && Boolean(errors.inflationMean)}
                helperText={touched.inflationMean && errors.inflationMean}
              />
            </FormControl>
          </Box>
        )}
        <Box sx={{ flex: 1 }} />
      </Box>
      <Box>
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
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <FormControl
          sx={commonFormStyles.shortFormInput}
          error={
            touched.postRetirementInvestmentStyle &&
            Boolean(errors.postRetirementInvestmentStyle)
          }
        >
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
            name="postRetirementInvestmentStyle"
            onChange={async (e) => {
              const selection = Object.values(INVESTMENT_STYLE_ENUM).find(
                (i) => i.label === e.target.value
              );
              await handleChange(e);
              setFieldValue(
                'postRetirementMeanRateOfReturn',
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
          <FormHelperText>
            {touched.postRetirementInvestmentStyle &&
              errors.postRetirementInvestmentStyle}
          </FormHelperText>
        </FormControl>
      </Box>
    </>
  );
}
