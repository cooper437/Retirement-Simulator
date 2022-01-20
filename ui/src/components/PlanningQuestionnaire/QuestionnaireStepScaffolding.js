import React from 'react';
import { Box, Paper } from '@mui/material';
/**
 * The scaffolding for all questionnaire steps
 * @param {} param0
 * @returns
 */
export default function QuestionnaireStepScaffolding({ children }) {
  return (
    <Box
      sx={{
        mt: '10em',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '50em',
          minHeight: '40em'
        }
      }}
    >
      <Paper elevation={3}>{children}</Paper>
    </Box>
  );
}
