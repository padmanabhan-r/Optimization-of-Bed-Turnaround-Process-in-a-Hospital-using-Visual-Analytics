import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = () => (
  <AppBar position="static" style={{background: '#2E3B55'}}>
    <Toolbar>
      <Typography
        className="header"
        variant="h2"
        color="inherit"
        align="center"
        fontFamily="arachia"
        style={{flex: 10}}
      >
        Hospital Bed Management
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
