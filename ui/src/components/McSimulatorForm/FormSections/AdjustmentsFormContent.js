import React from 'react';
import { Stack, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

// eslint-disable-next-line no-unused-vars
export default function AdjustmentsFormContent({
  commonFormStyles,
  adjustPortfolioBalanceForInflation,
  adjustContributionsForIncomeGrowth,
  adjustWithdrawalsForInflation,
  adjustWithdrawalsForTaxation,
  handleChange
}) {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <FormGroup sx={{ width: '50%' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={adjustPortfolioBalanceForInflation}
                name="adjustPortfolioBalanceForInflation"
                onChange={handleChange}
              />
            }
            label="Adjust Portfolio Balance for Inflation"
          />
        </FormGroup>
        <FormGroup sx={{ width: '50%' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={adjustWithdrawalsForInflation}
                name="adjustWithdrawalsForInflation"
                onChange={handleChange}
              />
            }
            label="Adjust Withdrawals for Inflation"
          />
        </FormGroup>
      </Stack>
      <Stack direction="row" spacing={2}>
        <FormGroup sx={{ width: '50%' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={adjustContributionsForIncomeGrowth}
                name="adjustContributionsForIncomeGrowth"
                onChange={handleChange}
              />
            }
            label="Adjust Contributions for Income Growth"
          />
        </FormGroup>
        <FormGroup sx={{ width: '50%' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={adjustWithdrawalsForTaxation}
                name="adjustWithdrawalsForTaxation"
                onChange={handleChange}
              />
            }
            label="Adjust Withdrawals for Taxation"
          />
        </FormGroup>
      </Stack>
    </>
  );
}
