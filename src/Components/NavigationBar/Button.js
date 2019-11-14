import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(2),
    },
    color:'#FFFF20'
}));

const MyButton = () => {
    const classes = useStyles();

    return (
            <Fab color="primary" variant="extended" aria-label="signOut" className={classes.fab}>
                SignOut
        </Fab>
    );
}

// const MyButton = styled(FloatingActionButtons)({
//     // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
//     color: 'white',
// });

export default MyButton;