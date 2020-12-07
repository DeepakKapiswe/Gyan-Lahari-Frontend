import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse, Typography, ButtonBase, Button, ListItem, Divider, Grid, ListItemText, ButtonGroup } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import Logo from '../../Components/Logo/Logo';
import logo from '../../assets/img/LOGO_NEW 2020.png'
import { Link } from '@reach/router';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100vh',
    fontFamily: 'Domine, serif',
    fontWeight: '700',
  },
  appbar: {
    background: '#050355',
    // opacity : '0.85',

  },
  appbarWrapper: {
            width: '80%',
    [theme.breakpoints.down('md')]: {
            width: '90%',
            height: '90%',
        },
    margin: '0 auto',
  },
  appbar2Wrapper: {
    height: '50px',
    background: '#ffffff',
    // color: '#dac693',
    // opacity : '0.7',
     position: 'sticky',
        top: '0px',
        left: '0px'
  },
  appbarTitle: {
    flexGrow: '1',
  },
  icon: {
    color: '#fff',
    fontSize: '2rem',
  },
  colorText: {
    color: '#5AFF3D',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    // color: '#fff',
    fontSize: '4.5rem',
  },
  goDown: {
    color: '#5AFF3D',
    fontSize: '4rem',
  },
  logo:{
    [theme.breakpoints.up('sm')]: {
        maxWidth: '7%',
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: '15%',
      },
  },
  links :{
      width: '80%',
      color:'#28231e',
      margin: '0 auto',
  },
  link :{
      color:'#28231e',
      margin: '0 auto',
  },
  link1 :{
      color:'#fff',
      margin: '0 auto',
  },
  button : {
     height:'50px'
  },
  buttonText : {
     fontSize:'1rem',
     fontFamily: 'Domine, serif',
    fontWeight: '700',
  }
}));
export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
        <AppBar>
        <Toolbar className={classes.appbar2Wrapper} dense >
            <Grid container  
                  justify="flex-end" className={classes.links}
                  spacing={1} alignItems="baseline"
                  >
            <Grid item >
            <ButtonGroup variant="text" size="large"  aria-label="text primary button group" disableElevation  >
              <Button className={classes.link} 
                classes={{root:classes.button, text:classes.buttonText}}>
                    Home
              </Button>
              <Scroll to="someId" smooth={true}>
              <Button className={classes.link} 
                classes={{root:classes.button, text:classes.buttonText}}>
                    Books
              </Button>
              </Scroll>
              <Scroll to="23" smooth={true}>
              <Button className={classes.link} 
                classes={{root:classes.button, text:classes.buttonText}}>
                    Events
              </Button>
              </Scroll>
            </ButtonGroup>
            </Grid>
            </Grid>
        </Toolbar>
        </AppBar>
      <AppBar className={classes.appbar} 
              elevation={0} 
              position="sticky"
      >
        <Toolbar className={classes.appbarWrapper}>
          <div className={classes.appbarTitle}>
              <Link to="/homePage">
                <img src={logo} alt="Gyan" className={classes.logo}/>
              </Link>
          </div>
          <ButtonGroup variant="text" size="large"  aria-label="text primary button group" disableElevation  >
              <Button className={classes.link1} 
                classes={{root:classes.button, text:classes.buttonText}}>
                    Home
              </Button>
              <Scroll to="someId" smooth={true}>
              <Button className={classes.link1} 
                classes={{root:classes.button, text:classes.buttonText}}>
                    Books
              </Button>
              </Scroll>
              <Scroll to="23" smooth={true}>
              <Button className={classes.link1} 
                classes={{root:classes.button, text:classes.buttonText}}>
                    Events
              </Button>
              </Scroll>
            </ButtonGroup>
          <IconButton>
              <AccountCircleIcon fontSize="large" className={classes.icon}/>
          </IconButton>
              
        </Toolbar>
        </AppBar>

      {/* <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
              Jai Sri Sadguru
          </h1>
          <Scroll to="76" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse> */}
    </div>
  );
}

