import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useSaveLastLocation, useSaveNextLocation } from '../../Hooks/SaveLocation';
import Logo from '../Logo/Logo';
import { useNavigate } from '@reach/router';
import { CssBaseline, Grid } from '@material-ui/core';
import { isLoggedIn, getUserTypeLS } from '../../Library/Library';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  heading: {
    color: '#aaaaaa',
    [breakpoints.down('md')]: {
      fontSize: '3rem',
    },
    [breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  root:{
      padding:20,
      minHeight: '100vh',
    // backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/tmpbg.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }
}));

export default function Home (props) {
  const styles= useStyles();
  const handleClick = () => {
       
    };
  const userName = getUserTypeLS();

  return (
    <div className={styles.root}>
      <CssBaseline/>
    <Logo/>
      <Typography variant="h2" component="h3" align="center"
          className={styles.heading}>
            Welcome {userName !== null && userName.substring(1)}
      </Typography>
      <Typography variant="h2" component="h4" align="center"
          className={styles.heading}>
              We are working hard, Hold on
      </Typography>
      <Typography variant="h2" component="h3" align="center"
          className={styles.heading}>
            <p>Home Page Will Be Implemented Soon...</p>
      </Typography>
        { !isLoggedIn() && <>
        <Typography variant="h2" component="h3" align="center"
            className={styles.heading}>
                  <p> Please Sign In to continue </p>
        </Typography>
            <Grid 
              container
              direction="row"
              justify="center"
              alignItems="center"
              >
              <Grid item xs={4} >
        <Button 
          variant="contained"
          onClick={handleClick}
          color="primary"
          fullWidth
          >
              SignIn
          </Button>
          </Grid>
          </Grid>
        </> }
    </div> );
}
