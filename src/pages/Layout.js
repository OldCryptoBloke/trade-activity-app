import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, } from '@mui/material';
import React, { useState } from 'react';


const Layout = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#2e3b4e' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            The Old Dude's Stuff
          </Typography>
          <Button color="inherit" onClick={handleClick}>
            Menu
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleClose}>
              <Typography component={Link} to="/" variant="button" color="inherit" sx={{ textDecoration: 'none' }}>
                Home
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography component={Link} to="/trade-activity" variant="button" color="inherit" sx={{ textDecoration: 'none' }}>
                Trade Activity
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography component={Link} to="/open-positions" variant="button" color="inherit" sx={{ textDecoration: 'none' }}>
                Open Positions
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography component={Link} to="/test2" variant="button" color="inherit" sx={{ textDecoration: 'none' }}>
                Test2
              </Typography>
            </MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  )
};

export default Layout;
