import React from 'react';
import SubscriberDetails from '../SubscriberDetails/SubscriberDetails';
import ButtonRouter from '../../Common/ButtonRouter';
import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: spacing(1),
    },
  },
  heading: {
    // color: '#aaaaaa',
    // color: '#110F4C',
    [breakpoints.down('md')]: {
      fontSize: '2rem',
    },
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
    backgroundColor: '#ebf5ab'
    // background: 'linear-gradient(90deg, rgba(213,185,129,1) 0%, rgba(222,189,134,0.9682247899159664) 45%, rgba(218,188,109,0.9738270308123249) 82%)',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CustomizedSnackbars() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
             Successfully Applied to Add New Subscriber
        </Alert>
      </Snackbar>
    </div>
  );
}

export default function SearchResult (props) {
    const styles= useStyles();
    if (props.location.state == null) { return (
       <>
        <h1> Oops... Something Went Wrong Please Add New Subscriber !! </h1>
        <ButtonRouter route="/addNewSubscriber" label="Add New Subscriber" />
       </>
    ); }
    const subApp = props.location.state.subscriberApplicationData;
    return (
       <>
        <Typography variant="h4" component="h4"
          className={styles.heading} align="center" >
              Application Serial Number : {subApp.saApplicationId}
        </Typography>
        <CustomizedSnackbars />
        <SubscriberDetails subscriber={subApp.saSubscriberData} />
        <ButtonRouter route="/addNewSubscriber" label="Add New Subscriber" />
       </>
    );
}