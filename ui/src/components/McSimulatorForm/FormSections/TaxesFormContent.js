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
import NumberFormatDollarAmount from '../../NumberFormatDollarAmount';

export default function TaxesFormContent({
  commonFormStyles,
  filingStatus,
  additionalPostRetirementAnnualIncome,
  setFilingStatus,
  setAdditionalPostRetirementAnnualIncome,
  adjustWithdrawalsForTaxation
}) {
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      {adjustWithdrawalsForTaxation && (
        <FormControl sx={commonFormStyles.shortFormInput}>
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
            onChange={(e) => setFilingStatus(e.target.value)}
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
        </FormControl>
      )}
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
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            endAdornment: <InputAdornment position="end">.00</InputAdornment>
          }}
        />
      </FormControl>
      <Box sx={commonFormStyles.longFormInput} />
    </Box>
  );
}
