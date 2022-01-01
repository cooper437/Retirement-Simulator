import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem,
  FormHelperText,
  Typography
} from '@mui/material';
import NumberFormat from 'react-number-format';
import { determineTaxRate } from '../../../utils/generalUtils';

export default function TaxesFormContent({
  commonFormStyles,
  filingStatus,
  handleChange,
  touched,
  errors,
  postRetirementAnnualWithdrawal,
  additionalPostRetirementAnnualIncome
}) {
  let postRetirementAnnualIncome;
  let taxRate;
  if (
    filingStatus &&
    postRetirementAnnualWithdrawal &&
    additionalPostRetirementAnnualIncome
  ) {
    postRetirementAnnualIncome =
      parseInt(postRetirementAnnualWithdrawal, 10) +
      parseInt(additionalPostRetirementAnnualIncome, 10);
    const taxRateNonDecimal =
      determineTaxRate({
        filingStatus,
        annualIncome: postRetirementAnnualIncome
      }) * 100;
    taxRate = taxRateNonDecimal.toString();
  }
  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <FormControl
          sx={commonFormStyles.shortFormInput}
          error={touched.filingStatus && Boolean(errors.filingStatus)}
        >
          <InputLabel id="filing-status-label">
            Post-Retirement Filing Status
          </InputLabel>
          <Select
            labelId="filing-status-label"
            id="filing-status-input"
            label="Post-Retirement Filing Status"
            startAdornment={<InputAdornment position="start" />}
            endAdornment={<InputAdornment position="end" />}
            value={filingStatus}
            name="filingStatus"
            onChange={handleChange}
          >
            <MenuItem value="singleFiler">Single Filer</MenuItem>
            <MenuItem value="marriedFilingJointly">
              Married Filing Jointly
            </MenuItem>
            <MenuItem value="marriedFilingSeparately">
              Married Filing Separately
            </MenuItem>
          </Select>
          <FormHelperText>
            {touched.filingStatus && errors.filingStatus}
          </FormHelperText>
        </FormControl>
      </Box>
      {postRetirementAnnualIncome && !Number.isNaN(postRetirementAnnualIncome) && (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          sx={{ mt: 2 }}
        >
          <Typography>
            Based on your expected annual income post retirement of{' '}
            <NumberFormat
              thousandsGroupStyle="thousand"
              value={postRetirementAnnualIncome.toString()}
              prefix="$"
              decimalSeparator="."
              displayType="text"
              type="text"
              thousandSeparator
              allowNegative
            />{' '}
            your assumed tax rate is {taxRate}%.
          </Typography>
        </Box>
      )}
    </>
  );
}
