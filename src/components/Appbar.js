import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/material/Menu';
import Grid from '@mui/material/Grid';

export default function Appbar() {
   //const classes = useStyles();
//
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start"  color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" >
          <Grid justify = "center">
            Spring Boot React Full Stack Application 
            </Grid>
          </Typography>
        
        </Toolbar>
      </AppBar>
    </div>
  );
  }