import React from 'react';
// import Fab from '@material-ui/core/Fab';
// import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { navigate } from '@reach/router';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const onReset = () => {
    navigate(-1);
};

const useStyles = makeStyles(theme => (
    {
        submit: {
            margin: theme.spacing(3, 0, 2),
        },

    }));

export default function BackButton(props) {
    const classes = useStyles();
    return (
        <Grid
          container
          justify="center"
          alignItems="center"
        >
            <Grid item
             xs={4} sm={4} md={3}
             lg={2} xl={2}>

                <Button
                    type="submit"
                    name="BackButton"
                    fullWidth
                    onClick={onReset}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    {(props.label == null) ?  'Go Back' : props.label} 
                  </Button>
            </Grid>
        </Grid>
    )
};