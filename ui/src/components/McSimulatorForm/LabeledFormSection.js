import React from 'react';
import { Box, Typography } from '@mui/material';
import { SECTION_BACKGROUND_COLOR } from '../../colors';

export default function LifestyleFormInputs() {
  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        backgroundColor: SECTION_BACKGROUND_COLOR,
        borderRadius: '10px'
      }}
    >
      <Typography variant="h6">Lifestyle</Typography>
    </Box>
  );
}
