import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

export default function TopNavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <ImageOutlinedIcon
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </ImageOutlinedIcon>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            TruWealth Retirement Planning
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
