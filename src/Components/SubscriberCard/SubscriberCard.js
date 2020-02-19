import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    backgroundColor: '#daf5df'
  },
}));

export default function SubscriberCard(props) {
  const classes = useStyles();
  const sD = props.subscriberDetails;
  const sp = " ";

  return (
    <Card className={classes.root} variant="outlined"
      component={Paper} elevation={6}>
      <CardContent>
        <Typography variant="h6" component="p">
          {sD.custSaluation}{sp}{sD.custFname}{sp}{sD.custMname}{sp}{sD.custLname}
        </Typography>
        <Grid container
          component={Typography}
          spacing={0}
          direction="column"
          justify="flex-start"
          alignItems="baseline"
        >
          <Grid item >
            {sD.custAdd1}
          </Grid>
          <Grid item>
            {sD.custAdd2}
          </Grid>
          <Grid item>
            {sD.custPost}
          </Grid>
          <Grid item>
            {sD.custCity}
          </Grid>
          <Grid item>
            {sD.custState}
          </Grid>
          <Grid item>
            {sD.custPincode}
          </Grid>
          <Grid item>
            {sD.custPhone}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
