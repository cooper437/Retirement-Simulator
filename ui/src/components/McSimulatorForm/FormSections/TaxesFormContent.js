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
import { determineTaxRate } from '../../../utils/generalUtils';

export default function TaxesFormContent({
  commonFormStyles,
  filingStatus,
  handleChange,
  touched,
  errors
}) {
  // const postRetirementAnnualIncome =
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
      <Box display="flex" flexDirection="row" justifyContent="center">
        <Typography>
          Based on your expected income post retirement you tax rate is X%
        </Typography>
      </Box>
    </>
  );
}
