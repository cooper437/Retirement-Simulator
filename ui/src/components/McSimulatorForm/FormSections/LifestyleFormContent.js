import React from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

function LifestyleFormContent({ commonFormStyles }) {
  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <TextField
        sx={commonFormStyles.shortFormInput}
        id="current-age-input"
        label="Current Age"
        variant="outlined"
        type="number"
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        sx={commonFormStyles.shortFormInput}
        id="retirement-age-input"
        label="Retirement Age"
        variant="outlined"
        type="number"
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        sx={commonFormStyles.shortFormInput}
        id="life-expectancy-input"
        label="Life Expectancy"
        variant="outlined"
        type="number"
        InputLabelProps={{
          shrink: true
        }}
      />
    </Box>
  );
}

export default LifestyleFormContent;
