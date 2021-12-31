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

function CustomizedSnackbars(props) {
  const classes = useStyles();
  const appType = props.appType;
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
             {
              appType === 'AddNewSubscriber' ? 'Successfully Applied For Adding New Subscriber' :
              appType === 'EditSubscriberDetails' ? 'Successfully Applied For Editing Subscriber Address Details' :
              appType === 'EditSubscriptionDetails' ? 'Successfully Applied For Editing Subscription Details' :
              appType === 'RenewSubscription' ? 'Successfully Applied For Subscription Renewal' :
              appType === 'RenewSubscriptionEditSubscriberDetails' ? 'Successfully Applied For Subscription Renewal And Update Address' :
              null
        }
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
        <ButtonRouter route="/patrika/addNewSubscriber" label="Add New Subscriber" />
       </>
    ); }
    const subApp = props.location.state.subscriberApplicationData;
    return (
       <div className={styles.color}>
            <CustomizedSnackbars appType={subApp.appType}/>
        <div className={styles.root}>
            <SubscriptionApplicationCard  applicationData={subApp}/>
        </div>
        <div className={styles.root}>
            <ButtonRouter route="/patrika/" label="Go To Home" />
            <ButtonRouter route="/patrika/viewAllSubscriberApplications" label="View All Applications" />
        </div>
        <div className={styles.root}>
        </div>
       </div>
    );
}