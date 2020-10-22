import React from 'react';
import ButtonRouter from '../../Common/ButtonRouter';
import { makeStyles} from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SubscriptionApplicationCard from '../SubscriptionApplicationCard/SubscriptionApplicationCard';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  rootSnack: {
    width: '100%',
    '& > * + *': {
      marginTop: spacing(1),
    },
  },
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    [breakpoints.up('sm')]: {
      paddingTop: spacing(2),
    },
  },
  color:{
    backgroundColor: '#ebf5ab'
  },
  heading: {
    [breakpoints.down('md')]: {
      fontSize: '2rem',
    },
    [breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
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
    <div className={classes.rootSnack}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
             Successfully Applied to Add New Subscriber
        </Alert>
      </Snackbar>
    </div>
  );
}

export default function ViewSubscriberApplication (props) {
    const styles= useStyles();
    if (props.location.state == null) { return (
       <>
        <h1> Oops... Something Went Wrong Please Add New Subscriber !! </h1>
        <ButtonRouter route="/addNewSubscriber" label="Add New Subscriber" />
       </>
    ); }
    const subApp = props.location.state.subscriberApplicationData;
    return (
       <div className={styles.color}>
            <CustomizedSnackbars />
        <div className={styles.root}>
            <SubscriptionApplicationCard  applicationData={subApp}/>
        </div>
        <div className={styles.root}>
            <ButtonRouter route="/addNewSubscriber" label="Add New Subscriber" />
        </div>
       </div>
    );
}