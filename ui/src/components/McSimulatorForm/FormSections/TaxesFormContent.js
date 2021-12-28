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

export default function TaxesFormContent({
  commonFormStyles,
  filingStatus,
  additionalPostRetirementAnnualIncome,
  setFilingStatus,
  setAdditionalPostRetirementAnnualIncome
}) {
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
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
          <MenuItem value="head-of-household">Head of Household</MenuItem>
          <MenuItem value="qualifying-widower-with-dep-child">
            Qualifying Widow(er) with Dependent Child
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={commonFormStyles.longFormInput}>
        <InputLabel htmlFor="additional-annual-income">
          Post-Retirement Additional Annual Income
        </InputLabel>
        <OutlinedInput
          id="additional-annual-income"
          inputProps={{
            style: { textAlign: 'right' }
          }}
          type="number"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          endAdornment={<InputAdornment position="end">.00</InputAdornment>}
          label="Post Retirement Additional Annual Income"
          value={additionalPostRetirementAnnualIncome}
          onChange={(e) =>
            setAdditionalPostRetirementAnnualIncome(
              parseInt(e.target.value, 10)
            )
          }
        />
      </FormControl>
      <Box sx={commonFormStyles.longFormInput} />
    </Box>
  );
}
