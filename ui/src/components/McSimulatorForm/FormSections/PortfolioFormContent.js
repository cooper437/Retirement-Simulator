import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment
} from '@mui/material';

export default function PortfolioFormContent({ commonFormStyles }) {
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <FormControl sx={commonFormStyles.longFormInput}>
        <InputLabel htmlFor="initial-portfolio-amount">
          Initial Amount
        </InputLabel>
        <OutlinedInput
          id="initial-portfolio-amount"
          inputProps={{
            style: { textAlign: 'right' }
          }}
          type="number"
          onChange={() => null}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          endAdornment={<InputAdornment position="end">.00</InputAdornment>}
          label="Initial Amount"
        />
      </FormControl>
      <FormControl sx={commonFormStyles.longFormInput}>
        <InputLabel htmlFor="annual-contribution-pre-retirement">
          Annual Contribution Pre-Retirement
        </InputLabel>
        <OutlinedInput
          id="annual-contribution-pre-retirement"
          inputProps={{
            style: { textAlign: 'right' }
          }}
          onChange={() => null}
          type="number"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          endAdornment={<InputAdornment position="end">.00</InputAdornment>}
          label="Annual Contribution Pre-Retirement"
        />
      </FormControl>
      <FormControl sx={commonFormStyles.longFormInput}>
        <InputLabel htmlFor="annual-withdrawal-post-retirement">
          Annual Net Withdrawal Post-Retirement
        </InputLabel>
        <OutlinedInput
          id="annual-withdrawal-post-retirement"
          inputProps={{
            style: { textAlign: 'right' }
          }}
          onChange={() => null}
          type="number"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          endAdornment={<InputAdornment position="end">.00</InputAdornment>}
          label="Annual Net Withdrawal Post-Retirement"
        />
      </FormControl>
    </Box>
  );
}
