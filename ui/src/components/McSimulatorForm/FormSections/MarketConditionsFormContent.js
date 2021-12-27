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

export default function MarketConditionsFormContent({ commonFormStyles }) {
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
            onChange={() => null}
            startAdornment={<InputAdornment position="start" />}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            label="Pre-Retirement Rate of Return"
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
            onChange={() => null}
            startAdornment={<InputAdornment position="start" />}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            label="Post-Retirement Rate of Return"
          />
        </FormControl>
        <FormControl sx={commonFormStyles.shortFormInput}>
          <InputLabel shrink htmlFor="inflation-mean">
            Inflation Mean
          </InputLabel>
          <OutlinedInput
            id="inflation-mean"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              style: { textAlign: 'right' }
            }}
            onChange={() => null}
            startAdornment={<InputAdornment position="start" />}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            label="Inflation Mean"
          />
        </FormControl>
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
            onChange={() => null}
            startAdornment={<InputAdornment position="start" />}
            endAdornment={<InputAdornment position="end" />}
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
            onChange={() => null}
            startAdornment={<InputAdornment position="start" />}
            endAdornment={<InputAdornment position="end" />}
          >
            <MenuItem value="aggressive">Aggressive</MenuItem>
            <MenuItem value="moderate-agressive">Moderate Aggressive</MenuItem>
            <MenuItem value="moderate">Moderate</MenuItem>
            <MenuItem value="conservative">Conservative</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={commonFormStyles.shortFormInput}>
          <InputLabel shrink htmlFor="income-growth-mean">
            Income Growth Mean
          </InputLabel>
          <OutlinedInput
            id="income-growth-mean"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              style: { textAlign: 'right' }
            }}
            onChange={() => null}
            startAdornment={<InputAdornment position="start" />}
            endAdornment={<InputAdornment position="end">%</InputAdornment>}
            label="Income Growth Mean"
          />
        </FormControl>
      </Box>
    </>
  );
}
