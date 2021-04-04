import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './signin.css';
import custImg from './lotus.png';
import { Fab } from '@material-ui/core';
import { useNavigate } from "@reach/router";
import { useGotoRememberedLocation } from '../../Hooks/GotoRememberedLocation';

function Copyright() {
    return (
        <React.Fragment >
            <Typography variant="body2" color="textSecondary"  >
                Sri Kabir Gyan Prakashan Kendra
        </Typography>
            <Typography variant="body2" color="textSecondary" >
                {'Copyright © '}
                <Link href="https://kabirgyan.com/">
                    Gyan Lahari
            </Link>
                {' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
            <Typography variant="body2" color="textSecondary" >
                {'Contact us '}
                {'+91-9155950505'}
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
                padding: theme.spacing(0),
            },
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
    const navigate = useNavigate();
    const {movetoLastLocation} = useGotoRememberedLocation();
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        data.userRole = props.userRole || "administrativeUser" ;
        navigate("/patrika/loginResult/", { state: { userAuthData: data } });
    };

    const classes = useStyles();

    function CancelButton() {
        return <Grid container direction="row-reverse">
            <Grid item>
                <Fab
                    variant="extended"
                    size="small"
                    color="primary"
                    aria-label="add"
                    className={classes.margin}
                    onClick={() => movetoLastLocation()}
                >
                    Cancel
                   </Fab>
            </Grid>
        </Grid>
    }
    return (
        <>
            <Grid
                container xs
                className={classes.bgColor}
                direction="row-reverse"
                justify="center"
                alignItems="center"
            >
                <Grid container component="main" className={classes.root}>
                    {props.cancelButton && <CancelButton />}
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
                                onSubmit={handleSubmit(onSubmit)}
                                className={classes.form}
                                noValidate
                            >
                                {props.user !== "Admin" && 
                                    <>
                                    <Typography align="center">
                                        Please Enter Your Registered Mobile Number
                                    </Typography>
                                    <Typography align="center">
                                        कृपया अपना रेजिस्टर्ड मोबाइल नम्बर भरें
                                    </Typography>
                                    </>
                                }
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    inputRef={register}
                                    required
                                    type={props.user === "Admin" ? "text" : "number"}
                                    id="userId"
                                    name="userId"
                                    label={props.user === "Admin" ? "User Name" : "Mobile Number"}
                                    fullWidth
                                    autoComplete="userId"
                                />
                                {props.user === "Admin" && <TextField
                                    variant="outlined"
                                    margin="normal"
                                    inputRef={register}
                                    id="password"
                                    name="password"
                                    label="Password"
                                    autoComplete="password"
                                    required
                                    fullWidth
                                    type="password" />
                                    }
                                
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Login
                            </Button>
                                {props.user !== "Admin" ? 
                                  <Grid container direction="column">
                                      <Grid item>
                                          <Typography >
                                              To register your mobile number
                                          </Typography>
                                      </Grid>
                                      <Grid item>
                                          <Typography >
                                              Give us a call at +91-9155950505
                                          </Typography>
                                      </Grid>
                                  </Grid> :
                                  <Grid container direction="column">
                                      <Grid item>
                                          <Typography >
                                              For Tech Support Call +91-9155950505
                                          </Typography>
                                      </Grid>
                                  </Grid>

                                }
                                <Box mt={5}>
                                    <Copyright />
                                </Box>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
