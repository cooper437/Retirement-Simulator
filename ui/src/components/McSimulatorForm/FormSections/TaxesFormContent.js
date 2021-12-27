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

export default function TaxesFormContent({ commonFormStyles }) {
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <FormControl sx={commonFormStyles.shortFormInput}>
        <InputLabel id="filing-status-label">Filing Status</InputLabel>
        <Select
          labelId="filing-status-label"
          id="filing-status-input"
          label="Filing Status"
          onChange={() => null}
          startAdornment={<InputAdornment position="start" />}
          endAdornment={<InputAdornment position="end" />}
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
          Additional Annual Income
        </InputLabel>
        <OutlinedInput
          id="additional-annual-income"
          inputProps={{
            style: { textAlign: 'right' }
          }}
          type="number"
          onChange={() => null}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          endAdornment={<InputAdornment position="end">.00</InputAdornment>}
          label="Additional Annual Income"
        />
      </FormControl>
      <Box sx={commonFormStyles.longFormInput} />
    </Box>
  );
}
