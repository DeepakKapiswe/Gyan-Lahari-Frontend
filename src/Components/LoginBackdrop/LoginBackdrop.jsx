import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import LoginForm from '../LoginForm/LoginForm';

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

export default function LoginBackdrop() {
    const [open, setOpen] = React.useState(true);
    const theme = useTheme();
    const classes = useStyles();
    
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        setOpen(false);
        
    };

    return (
        <div className={classes.bgColor}>
            <Dialog
                fullScreen={fullScreen}
                fullWidth="true"
                maxWidth="lg"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="login-prompt"
            >
                <DialogContent>
                  <LoginForm cancelButton="true" />
                </DialogContent>
            </Dialog>
        </div>
    );
}