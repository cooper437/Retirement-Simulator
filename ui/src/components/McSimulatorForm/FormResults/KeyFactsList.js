import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';

export default function KeyFactsList({
  simulationResults,
  roundedSurvivalRate,
  roundedDepletionRate
}) {
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography>
              {simulationResults.numberOfSimulations} retirement scenarios were
              simulated.
            </Typography>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography>
              In {roundedSurvivalRate} of simulated scenarios your portfolio{' '}
              <Typography variant="span" sx={{ fontWeight: 'bold' }}>
                did not
              </Typography>{' '}
              run out of money prior to life expectancy.
            </Typography>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography>
              In {roundedDepletionRate} of simulated scenarios your portfolio{' '}
              <Typography variant="span" sx={{ fontWeight: 'bold' }}>
                did
              </Typography>{' '}
              run out of money prior to life expectancy.
            </Typography>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography>
              Post-retirement if you withdraw less than $XXX / year there is a
              95% probability of not running out of money.
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
}
