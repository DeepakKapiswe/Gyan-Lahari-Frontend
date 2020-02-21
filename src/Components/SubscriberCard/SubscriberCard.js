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
          {sD.subSaluation}{sp}{sD.subFname}{sp}{sD.subMname}{sp}{sD.subLname}
        </Typography>
        <Grid container
          component={Typography}
          spacing={0}
          direction="column"
          justify="flex-start"
          alignItems="baseline"
        >
          <Grid item >
            {sD.subAdd1}
          </Grid>
          <Grid item>
            {sD.subAdd2}
          </Grid>
          <Grid item>
            {sD.subPost}
          </Grid>
          <Grid item>
            {sD.subCity}
          </Grid>
          <Grid item>
            {sD.subState}
          </Grid>
          <Grid item>
            {sD.subPincode}
          </Grid>
          <Grid item>
            {sD.subPhone}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
