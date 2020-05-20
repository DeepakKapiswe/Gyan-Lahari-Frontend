import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './signin.css';
import custImg from './lotus.png';
import { navigate } from '@reach/router';

function Copyright() {
    return (
        <React.Fragment >
        <Typography variant="body2" color="textSecondary"  >
            Sri Kabir Gyan Prakashan Kendra
        </Typography>
        <Typography variant="body2" color="textSecondary" >
            {'Copyright © '}
            <Link color="secondary" href="https://kabirgyan.com/">
                kabir Gyan
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
        </React.Fragment>
    );
}


const useStyles = makeStyles(theme => (
    {
        root: {
            height: '70vh',
        },
        image: {
            [theme.breakpoints.up('md')]: {
            backgroundImage: `url(${custImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // backgroundColor: '#FFFF22',
            // backgroundColor: 'linear-gradient(to bottom,  rgba(255,197,120,1) 6%,rgba(255,197,120,1) 17%,rgba(255,197,120,1) 29%,rgba(255,197,120,1) 29%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 49%,rgba(255,197,120,1) 60%,rgba(255,197,120,1) 60%,rgba(251,157,35,1) 97%,rgba(251,157,35,1) 98%,rgba(251,157,35,1) 98%,rgba(251,157,35,1) 100%,rgba(251,157,35,1) 101%)',
            backgroundHeight: '100%',
            zIndex: '-1',
             backgroundColor: '#ebf5ab',
              },
        },
        bgColor: {
            flexGrow: 1,
          },
        paper: {
            // width: '100%',
            margin: theme.spacing(8, 4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
              padding:theme.spacing(0),},
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            [theme.breakpoints.up('md')]: {
            width: '70%',
            },
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

export default function SignIn(props) {
    const classes = useStyles();
    return (
            <Grid
      container xs
      className={classes.bgColor}
      direction="row-reverse"
      justify="center"
      alignItems="center"
    >

            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={false} md={7} className={classes.image} />
                <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Typography component="h2" variant="h4">
                            {props.user}
                        </Typography>
                        <Typography >
                            Details
          </Typography>
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={event => {
                                event.preventDefault()
                                navigate(`/user/${event.target.email.value}`)
                            }}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
            </Grid>

    );
}
