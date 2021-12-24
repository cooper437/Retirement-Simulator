import React from 'react';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

function LifestyleFormContent() {
  return (
    <Box display="flex" flexDirection="column">
      <TextField
        id="current-age-input"
        label="Current Age"
        variant="outlined"
        type="number"
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
        id="retirement-age-input"
        label="Retirement Age"
        variant="outlined"
        type="number"
        InputLabelProps={{
          shrink: true
        }}
      />
      <TextField
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
