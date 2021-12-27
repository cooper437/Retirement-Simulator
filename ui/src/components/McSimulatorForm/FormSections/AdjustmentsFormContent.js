import React from 'react';
import { Stack, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

// eslint-disable-next-line no-unused-vars
export default function AdjustmentsFormContent({ commonFormStyles }) {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <FormGroup sx={{ width: '50%' }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Adjust Portfolio Balance for Inflation"
          />
        </FormGroup>
        <FormGroup sx={{ width: '50%' }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Adjust Withdrawals for Inflation"
          />
        </FormGroup>
      </Stack>
      <Stack direction="row" spacing={2}>
        <FormGroup sx={{ width: '50%' }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Adjust Contributions for Income Growth"
          />
        </FormGroup>
        <FormGroup sx={{ width: '50%' }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Adjust Withdrawals for Taxation"
          />
        </FormGroup>
      </Stack>
    </>
  );
}
