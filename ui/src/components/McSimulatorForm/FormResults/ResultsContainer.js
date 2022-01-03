import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import SummaryStatsTable from './SummaryStatsTable';
import { decimalToPercent } from '../../../utils/generalUtils';

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
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText
              primary={`${simulationResults.numberOfSimulations} retirement scenarios were simulated.`}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText
              primary={`In ${roundedSurvivalRate} of simulated scenarios your portfolio did not run out of money prior to life expectancy.`}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText
              primary={`In ${roundedDepletionRate} of simulated scenarios your portfolio did run out of money prior to life expectancy.`}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckIcon />
            </ListItemIcon>
            <ListItemText primary="Post-retirement if you withdraw less than $XXX / year there is a 95% probability of not running out of money." />
          </ListItem>
        </List>
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
