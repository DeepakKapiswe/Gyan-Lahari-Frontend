import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 4,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const useStyles2 = makeStyles({
  root: {
    //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    // background: 'rgb(207,223,118)',
    background: 'linear-gradient(90deg, rgba(207,223,118,0.6110819327731092) 0%, rgba(217,237,166,0.5970763305322129) 38%, rgba(235,246,192,0.6306897759103641) 83%)',
    borderRadius: 0,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'Black',
    padding: '0 30px',
  },
});

export function NavHead ({children}) {
  return (
    <Grid item xs={9}
          textAlign="end"
          alignContent="flex-start"
          position="static">
            {children}
        </Grid>
  );
}

const NavigationBar = (props) => {
  const classes = useStyles();
  const classes2 = useStyles2();
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}
        direction="row"
        position="static"
        justify="space-between"
        alignItems="baseline"
        className={classes2.root}
      >
        {props.navHead}
        {props.children}
      </Grid>
    </Paper>

  );
}

export default NavigationBar;