import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  InputAdornment,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';

export default function TaxesFormContent({
  commonFormStyles,
  filingStatus,
  handleChange,
  touched,
  errors
}) {
  return (
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
          <MenuItem value="single">Single</MenuItem>
          <MenuItem value="married-filing-jointly">
            Married Filing Jointly
          </MenuItem>
          <MenuItem value="married-filing-separately">
            Married Filing Separately
          </MenuItem>
          <MenuItem value="single-filer">Single Filer</MenuItem>
        </Select>
        <FormHelperText>
          {touched.filingStatus && errors.filingStatus}
        </FormHelperText>
      </FormControl>
      <Box sx={commonFormStyles.longFormInput} />
    </Box>
  );
}
