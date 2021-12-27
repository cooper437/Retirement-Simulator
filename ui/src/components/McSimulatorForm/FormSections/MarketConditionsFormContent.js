import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment
} from '@mui/material';

export default function MarketConditionsFormContent({ commonFormStyles }) {
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
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
    </Box>
  );
}
