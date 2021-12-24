import React from 'react';
import { Box, Typography } from '@mui/material';
import { SECTION_BACKGROUND_COLOR } from '../../colors';
/**
 * A higher order component that produces an outlined section of the McSimulator form
 * @param {String} sectionTitle - The title of the section
 * @param {function} render - A render prop representing the content of the form section
 * @returns
 */
export default function McSimulatorFormSection({ sectionTitle, render }) {
  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        backgroundColor: SECTION_BACKGROUND_COLOR,
        borderRadius: '10px'
      }}
    >
      <Typography variant="h6">{sectionTitle}</Typography>
      {render()}
    </Box>
  );
}
