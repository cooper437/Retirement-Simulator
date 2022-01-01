import React from 'react';
import _ from 'lodash';
import { Box } from '@mui/material';

export default function FormResults({ simulationResults }) {
  if (!_.isEmpty(simulationResults)) {
    const survivalRateNonDecimal = simulationResults.survivalRate * 100;
    const roundedSurvivalRate =
      Math.round((survivalRateNonDecimal + Number.EPSILON) * 100) / 100;
    return (
      <Box sx={{ mb: 2 }} display="flex" justifyContent="center">
        Out of {simulationResults.numberOfSimulations} simulations your
        portfolio survival rate is {roundedSurvivalRate}%.
      </Box>
    );
  }
  return null;
}
