import React from 'react';
import { Box, Typography } from '@mui/material';
import SummaryStatsTable from './SummaryStatsTable';
import { decimalToPercent } from '../../../utils/generalUtils';
import KeyFactsList from './KeyFactsList';
import Visualizations from './Visualizations';
import PortfolioBalancesChart from './PortfolioBalancesChart';

export default function ResultsContainer({
  simulationResults,
  adjustForInflation
}) {
  if (simulationResults.simulationRunCompleted) {
    const roundedSurvivalRate = decimalToPercent(
      simulationResults.survivalRate,
      true
    );
    const roundedDepletionRate = decimalToPercent(
      1 - simulationResults.survivalRate,
      true
    );
    return (
      <Box sx={{ ml: 4, mr: 4, mb: 2 }}>
        <Typography sx={{ mb: 2 }} variant="h6">
          Outcome Visualization
        </Typography>
        <Visualizations
          survivalRate={simulationResults.survivalRate}
          safeWithdrawalAmount={
            simulationResults.quantileStatistics['0.05'].safeWithdrawalAmount
          }
        />
        <Typography sx={{ mb: 2, mt: 8 }} variant="h6">
          Key Insights
        </Typography>
        <KeyFactsList
          simulationResults={simulationResults}
          roundedSurvivalRate={roundedSurvivalRate}
          roundedDepletionRate={roundedDepletionRate}
        />
        <Typography sx={{ mb: 2, mt: 8 }} variant="h6">
          Summary Statistics
        </Typography>
        <SummaryStatsTable
          quantileStatistics={simulationResults.quantileStatistics}
          adjustForInflation={adjustForInflation}
        />
        <Typography sx={{ mb: 2, mt: 8 }} variant="h6">
          Lifetime Portfolio Balances
        </Typography>
        <PortfolioBalancesChart
          quantileStatistics={simulationResults.quantileStatistics}
        />
      </Box>
    );
  }
  return null;
}
