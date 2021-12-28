import React from 'react';
import { Stack, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

// eslint-disable-next-line no-unused-vars
export default function AdjustmentsFormContent({
  commonFormStyles,
  adjustPortfolioBalanceForInflation,
  adjustContributionsForIncomeGrowth,
  adjustWithdrawalsForInflation,
  adjustWithdrawalsForTaxation,
  setAdjustPortfolioBalanceForInflation,
  setAdjustContributionsForIncomeGrowth,
  setAdjustWithdrawalsForInflation,
  setAdjustWithdrawalsForTaxation
}) {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <FormGroup sx={{ width: '50%' }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={adjustPortfolioBalanceForInflation}
                onChange={(e) =>
                  setAdjustPortfolioBalanceForInflation(e.target.checked)
                }
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
                onChange={(e) =>
                  setAdjustWithdrawalsForInflation(e.target.checked)
                }
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
                onChange={(e) =>
                  setAdjustContributionsForIncomeGrowth(e.target.checked)
                }
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
                onChange={(e) =>
                  setAdjustWithdrawalsForTaxation(e.target.checked)
                }
              />
            }
            label="Adjust Withdrawals for Taxation"
          />
        </FormGroup>
      </Stack>
    </>
  );
}
