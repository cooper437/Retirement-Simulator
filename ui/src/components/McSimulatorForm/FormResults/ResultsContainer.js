import React from 'react';
import { Box, Typography } from '@mui/material';
import SummaryStatsTable from './SummaryStatsTable';
import { decimalToPercent } from '../../../utils/generalUtils';
import KeyFactsList from './KeyFactsList';

export default function ResultsContainer({ simulationResults }) {
  if (simulationResults.simulationRunCompleted) {
    const roundedSurvivalRate = decimalToPercent(
      simulationResults.survivalRate
    );
    const roundedDepletionRate = decimalToPercent(
      1 - simulationResults.survivalRate
    );
    return (
      <Box sx={{ ml: 4, mr: 4, mb: 4 }}>
        <Typography sx={{ mb: 2 }} variant="h6">
          Key Facts
        </Typography>
        <KeyFactsList
          simulationResults={simulationResults}
          roundedSurvivalRate={roundedSurvivalRate}
          roundedDepletionRate={roundedDepletionRate}
        />
        <Typography sx={{ mb: 2, mt: 2 }} variant="h6">
          Summary Statistics
        </Typography>
        <SummaryStatsTable
          quantileStatistics={simulationResults.quantileStatistics}
        />
      </Box>
    );
  }
  return null;
}
