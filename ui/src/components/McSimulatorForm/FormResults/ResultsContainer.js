import React from 'react';
import { Box } from '@mui/material';
import SummaryStatsTable from './SummaryStatsTable';

export default function ResultsContainer({ simulationResults }) {
  if (simulationResults.simulationRunCompleted) {
    const survivalRateNonDecimal = simulationResults.survivalRate * 100;
    const roundedSurvivalRate =
      Math.round((survivalRateNonDecimal + Number.EPSILON) * 100) / 100;
    return (
      <Box sx={{ ml: 4, mr: 4 }}>
        <Box sx={{ mb: 2 }} display="flex" justifyContent="center">
          Out of {simulationResults.numberOfSimulations} simulations your
          portfolio did not run out of money {roundedSurvivalRate}% of the time.
        </Box>
        <SummaryStatsTable
          quantileStatistics={simulationResults.quantileStatistics}
        />
      </Box>
    );
  }
  return null;
}
