import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(2),
    },
    color:'#FFFF20'
}));

const MyButton = (props) => {
    const classes = useStyles();

    return (
            <Fab color="primary" variant="extended" aria-label={props.label} className={classes.fab}>
                {props.label}
        </Fab>
    );
}

export default MyButton;