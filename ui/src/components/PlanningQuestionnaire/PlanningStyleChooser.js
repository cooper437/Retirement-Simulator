import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Paper, Typography, Stack, Button } from '@mui/material';

export default function PlanningStyleChooser() {
  return (
    <Box
      sx={{
        mt: '10em',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '40em',
          height: '40em'
        }
      }}
    >
      <Paper elevation={3}>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around'
          }}
        >
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Which of the following options best describes you?
          </Typography>
          <Stack direction="row" spacing={2} sx={{ ml: 6, mr: 6 }}>
            <Button
              component={Link}
              to="/mc-input-form"
              sx={{ width: '50%', textAlign: 'center' }}
              variant="contained"
              size="large"
            >
              I&apos;m a Retirement Planning Expert
            </Button>
            <Button
              component={Link}
              to="/retirement-questionnaire"
              sx={{ width: '50%', textAlign: 'center' }}
              variant="contained"
              size="large"
            >
              I&apos;m new to planning for my retirement
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
