import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import NumberFormat from 'react-number-format';

export default function KeyFactsList({
  simulationResults,
  roundedSurvivalRate,
  roundedDepletionRate,
  safeWithdrawalAmount
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
              Post-retirement if you withdraw less than{' '}
              <NumberFormat
                thousandsGroupStyle="thousand"
                value={safeWithdrawalAmount}
                prefix="$"
                decimalSeparator="."
                decimalScale={0}
                displayType="text"
                type="text"
                thousandSeparator
                allowNegative
              />{' '}
              / year (in pre-inflation dollars) there is a 95% probability of
              not running out of money.
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
}
