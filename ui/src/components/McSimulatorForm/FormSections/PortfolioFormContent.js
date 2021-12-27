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
    <Box display="flex" flexDirection="column">
      <FormControl sx={commonFormStyles.longFormInput}>
        <InputLabel htmlFor="initial-portfolio-amount">
          Initial Amount
        </InputLabel>
        <OutlinedInput
          id="initial-portfolio-amount"
          onChange={() => null}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Initial Amount"
        />
      </FormControl>
    </Box>
  );
}
