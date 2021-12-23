import React from 'react';
import { Box, Typography } from '@mui/material';
import LabeledFormSection from './LabeledFormSection';

export default function FormContainer() {
  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ pb: 4, borderBottom: '1px solid gray' }}>
        <Typography variant="h6">Monte Carlo Simulator</Typography>
        <Typography variant="p">
          Input the information below and then run the simulation to see the
          likelihood that you will meet your retirement goals under a variety of
          market conditions
        </Typography>
      </Box>
      <LabeledFormSection />
    </Box>
  );
}
