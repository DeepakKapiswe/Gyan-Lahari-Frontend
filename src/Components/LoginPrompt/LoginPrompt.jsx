import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import { Typography, Grid } from '@material-ui/core';
import FlowerDiv from '../FlowerDiv/FlowerDiv';
import { navigate } from '@reach/router';
import Logo from '../Logo/Logo';
import { useGotoRememberedLocation } from '../../Hooks/GotoRememberedLocation';

const useStyles = makeStyles(theme => (
    {
        root: {
        },
        paper: {
            margin: theme.spacing(0, 0, 2, 0),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        names: {
            margin: theme.spacing(0, 0, 0, 1),
        },
        bgColor: {
            flexGrow: 1,
            [theme.breakpoints.up('md')]: {
                padding: theme.spacing(5),
            },
            backgroundColor: '#ebf5ab'

        },
        heading: {
            color: '#110F4C',
            [theme.breakpoints.up('sm')]: {
                fontSize: '3rem',
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: '2rem',
            },
        },
        form: {
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginPrompt(props) {
    const [open, setOpen] = React.useState(true);
    const theme = useTheme();
    const classes = useStyles();
    const {movetoLastLocation} = useGotoRememberedLocation();

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        setOpen(false);
        movetoLastLocation();
    };

    const handleLogin = () => {
        navigate("/patrika/loginBackdrop");
    };

    return (
        <div className={classes.bgColor}>
            <Dialog
                fullScreen={fullScreen}
                fullWidth="true"
                maxWidth="sm"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="login-prompt"
            >
                <DialogTitle id="responsive-dialog-title">
                    <Logo medium='true' />
                    <Typography variant="h2" component="h3"
                        className={classes.heading} align="center">
                        Please login to continue
                    </Typography>
                    <FlowerDiv />
                </DialogTitle>
                <DialogContent>
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                    >
                        <Grid item>
                            <Button variant="contained" onClick={handleClose} color="primary">
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button autoFocus variant="contained" onClick={handleLogin} color="primary">
                                Login / Signup
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}