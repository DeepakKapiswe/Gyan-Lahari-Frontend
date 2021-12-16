import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import SubscriberCard from '../SubscriberCard/SubscriberCard';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import logo from '../../assets/img/logo_small.png';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import { url_rejectSubscriberApplication 
       , url_approveSubscriberApplication
       , url_getSubscriber
       , url_distGetSubscriber, 
       url_subViewSubscriber} from '../../apiEndpoints/api';
import { ualApprover, ualManager } from '../../Common/Authorization';
import Cookies from 'js-cookie';
import { useAppState } from '../../Contexts/AppContext';
import { useSaveLastLocation } from '../../Hooks/SaveLocation';
import BlockIcon from '@material-ui/icons/Block';
import { Divider, FormControlLabel, Grid, Switch } from '@material-ui/core';
import formatDate from '../../Common/FormatDate';
import { getUserIdLS } from '../../Library/Library';

// import IconButton from '@material-ui/core/IconButton';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 500,
        [theme.breakpoints.up('sm')]: {
            minWidth: 450
        },
        backgroundColor: '#fdffe3',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        // backgroundColor: '#ebe5e1',
    },
}));

export default function SubscriptionApplicationCard(props) {
    const classes = useStyles();
    const [app, setAppData] = React.useState(props.applicationData);
    const [originalData, setOriginalData] = useState(null);
    const serial = app.appId;
    // const subscriberData = app.saSubscriberData;
    const {userType} = useAppState();
    const [loginStatus, setLoginStatus] = useState(true);
    const saveLastLocation = useSaveLastLocation();

    const [checked, setChecked] = useState(false);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const toggleChecked = () => {
      setChecked((prev) => !prev);
      if (!isDataFetched) {
        saveLastLocation();
        fetchOriginalData();
      }
      setIsDataFetched(true);
    };

    function fetchProcessedAppication(url) {
        const applicationData = {
            arApplicationId : serial,
            arProcessedBy : getUserIdLS()
        }
        saveLastLocation();
        fetch(url, {
            method: 'post',
            headers: {
            "Content-Type": "application/json",
            'Accept':  'application/json',
            'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
            },
            body: JSON.stringify(applicationData)
        }).then(res => res.ok ? res.json() : res.status)
        .then(data => {
            if (data === 401) 
                {setLoginStatus(false);}
            else 
               {setAppData(data);}
            return null;
        });
    }
    
    function fetchOriginalData() {
        const subInfo = app.appData.subId;
        const url = userType === 'USubscriber' ? url_subViewSubscriber :
                    userType === 'UDistributor' ? url_distGetSubscriber :
                    url_getSubscriber;
        fetch(url, {
            method: userType === 'USubscriber' ? 'GET' : 'post',
            headers: {
            "Content-Type": "application/json",
            'Accept':  'application/json',
            'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
            },
            body: userType === 'USubscriber' ? null : JSON.stringify(subInfo)
        }).then(res => res.ok ? res.json() : res.status)
        .then(data => {
            if (data === 401) 
                {setLoginStatus(false);}
            else 
               {setOriginalData(data);}
            return null;
        });
    }

    const handleApproveClick = () => {
        saveLastLocation();
        fetchProcessedAppication(url_approveSubscriberApplication);
  };
    
    const handleRejectClick = () => {
        saveLastLocation();
        fetchProcessedAppication(url_rejectSubscriberApplication);
  };

    const pending = <Chip
        icon={<TimerOutlinedIcon />} label="Pending"
        color="secondary"
    />;
    const approved = <Chip
        icon={<AssignmentTurnedInIcon />} label="Approved"
        color="Primary"
    />;
    const rejected = <Chip
        icon={<BlockIcon />} label="Rejected"
        color="secondary"
    />;

    const addNew = <Chip
            color="default"
            label="ADD NEW SUBSCRIBER"
            style={{backgroundColor:'#FFFF00',
                      fontWeight: 700,}}
            />

    const editSubscriberDetails = <Chip
            color="default"
            label="EDIT SUBSCRIBER DETAILS"
            />

    const editSubscriptionDetails = <Chip
            color="default"
            label="EDIT SUBSCRIPTION DETAILS"
            />

    const renew = <Chip
            color="default"
            label="RENEW SUBSCRIPTION"
            />
    const editRenew = <Chip
            style={{backgroundColor:'#00FF00',
                      fontWeight: 700,}}
            label="EDIT & RENEW SUBSCRIPTION"
            />


    const statusDisplay = 
        app.appStatus === 'Pending' ? pending :
        app.appStatus === 'Approved' ? approved :
        app.appStatus === 'Rejected' ? rejected :
        null;
    
    const appTypeDisplay =
        app.appType === 'AddNewSubscriber' ? addNew :
        app.appType === 'EditSubscriberDetails' ? editSubscriberDetails :
        app.appType === 'EditSubscriptionDetails' ? editSubscriptionDetails :
        app.appType === 'RenewSubscription' ? renew :
        app.appType === 'RenewSubscriptionEditSubscriberDetails' ? editRenew :
        null;
    
   

    return (
      loginStatus !== true ? <LoginPrompt/> :
        <Card className={classes.root}>
            <CardHeader
                // avatar={
                //     <Avatar aria-label="logo-awatar" variant="rounded"
                //         className={classes.avatar}
                //         src={logo} alt="" />
                // }
                action={
                    ((app.appStatus === 'Pending' &&
                    ( app.appType === 'EditSubscriberDetails' ?
                         <FormControlLabel
                          value="bottom"
                          control={<Switch color="primary" onChange={toggleChecked}/>}
                          label="View Original"
                          labelPlacement="bottom"
                        /> :
                      app.appType === 'EditSubscriptionDetails' ?
                         <FormControlLabel
                          value="bottom"
                          control={<Switch color="primary" onChange={toggleChecked}/>}
                          label="View Original"
                          labelPlacement="bottom"
                       /> :
                       null)) ||
                    (app.appType === 'EditSubscriptionDetails' ||
                     app.appType === 'RenewSubscription')) && (

                     <FormControlLabel
                          value="bottom"
                          control={<Switch color="primary" onChange={toggleChecked}/>}
                          label="View Address"
                          labelPlacement="bottom"
                        />)

                }
                // this can be used for adding more functions
                // action={
                //     <IconButton aria-label="settings">
                //         <MoreVertIcon />
                //     </IconButton>
                // }

                title={"Application Serial : " + serial}
                subheader={<>
                    {"Application Date : "} {formatDate(app.appSubmittedAt)} <br />   
                    {"Application Type : "} {appTypeDisplay} <br/>
                    {"Application Status : "} {statusDisplay} <br/>
                    { ualManager.includes(userType) && "Submitted By : " + app.appSubmittedBy} <br/>
                    {app.appProcessedAt && "Processed At : " + formatDate(app.appProcessedAt)} <br/>
                    { ualManager.includes(userType) && app.appStatus !== 'Pending' && "Processed By : " + app.appProcessedBy}

                </>}
            />

            {originalData !== null &&
             checked &&
             ((app.appStatus === 'Pending' && app.applicationType === 'EditDetails') || 
             ( app.appType === 'RenewSubscription')
             ) && 
             originalData[0] !== null &&
              <CardContent>
                  <p>Original: </p>
                  <SubscriberCard noActionButtons subscriberDetails={originalData[0]} />
                  <p>Proposed: </p>
              </CardContent>
            }
            <CardContent>
                {
                    app.appType === 'AddNewSubscriber' ? <DisplayNewSubscriberApplication newSubData={app.appData} /> :
                    app.appType === 'EditSubscriberDetails' ? <DisplayEditSubscriberDetailsApplication  subEditData={app.appData}  subOldData={originalData} /> :
                    app.appType === 'EditSubscriptionDetails' ? <DisplayEditSubscriptionApplication  subEditData={app.appData} /> :
                    app.appType === 'RenewSubscription' ? <DisplayRenewSubscriptionApplication renewSubscriptionData={app.appData} /> :
                    null

                }

                {/* <SubscriberCard noActionButtons subscriberDetails={subscriberData} /> */}
            </CardContent>
            <CardContent>
                {app.appStatus === 'Pending' && 
                <Typography variant="body2" color="textPrimary" component="p">
                    This subscription application will be approved only if confirmed by authorised personnel
                </Typography>}
                <Typography variant="body2" color="textPrimary" component="p">
                    किसी भी जानकारी व सहायता के लिए सम्पर्क करें - 9155950505
                </Typography>
            </CardContent>
           
           { ualApprover.includes(userType) && 
             app.appStatus === 'Pending' && 
             <CardActions>
                <Grid container justify="space-around">
                <Grid item>
                    <Button color="secondary"
                        onClick={handleRejectClick}
                        variant="contained"
                        startIcon={<DeleteIcon/>}
                    >
                        Reject
                    </Button>
                </Grid>
                <Grid item>
                    {/* <Button color="primary"
                        onClick={handleViewOriginalClick}
                        variant="contained"
                        startIcon={<VisibilityIcon/>}
                    >
                        View Original
                    </Button> */}
                </Grid>
                <Grid item>
                    <Button color="primary"
                        onClick={handleApproveClick}
                        startIcon={<CheckCircleOutlineIcon/>} 
                        variant="contained"
                    >
                        Approve
                    </Button>
                </Grid>
                </Grid>
            </CardActions>}
        </Card>
                );
}



const makeColumn = (str, comp) => {
  return <Grid container justify="space-between" alignItems="baseline" spacing={1}>
    <Grid item>
      <Typography variant="button" color="textSecondary" >
        <i>{str}</i>
      </Typography>
    </Grid>
    <Grid item>
      <Typography variant="body2" align="right" >
        <b>
          {comp}
        </b>
      </Typography>
    </Grid>
  </Grid>
}

 function DisplayNewSubscriberApplication (props) {
  const s = props.newSubData
  const styles = useStyles();
  return (
    <Card variant="outlined" >
      <Typography variant="button"
        align="left" color="textSecondary"
      >
                        {makeColumn("Name" ,s.subName   )}
                        <Divider variant="fullWidth" />
                        {makeColumn( "About",s.subAbout  )}
                        <Divider variant="fullWidth" />
                        {makeColumn( "Address Line 1",s.subAdd1 )}
                        <Divider variant="fullWidth" />
                        {makeColumn( "Address Line 2",s.subAdd2 )}
                        <Divider variant="fullWidth" />
                        {makeColumn( "Post",s.subPost   )}
                        <Divider variant="fullWidth" />
                        {makeColumn( "City",s.subCity   )}
                        <Divider variant="fullWidth" />
                        {makeColumn( "State",s.subState )}
                        <Divider variant="fullWidth" />
                        {makeColumn( "Pincode",s.subPincode)}
                        <Divider variant="fullWidth" />
                        {makeColumn( "Mobile",s.subPhone )}
                        <Divider variant="fullWidth" />
                        {makeColumn("Plan", <>{s.subPlan} Years</>)}
                        <Divider variant="fullWidth" />
                        {makeColumn("Valid for Volume Number", <> {s.subStartVol} --{'>'} {s.subEndVol}</>)}
                        <Divider variant="fullWidth" />
                        {makeColumn("Distributor Id", s.subDistId)}
                        <Divider variant="fullWidth" />
                        {makeColumn("Slip No.", s.subSlipNum)}
                        <Divider variant="fullWidth" />
                        {makeColumn("Subscription Type", "New")}
                        <Divider variant="fullWidth" />
                        {makeColumn("Subscription Medium", s.subMedium)}
      </Typography>
    </Card>
  );
}
function DisplayEditSubscriberDetailsApplication (props) {
  const s = props.subEditData
  const styles = useStyles();
  return (<>
    <Card variant="outlined" >
      <Typography variant="button"
        align="left" color="textSecondary"
      >
                        {makeColumn("Subscriber Code (SC)", s.subId )}
                        <Divider variant="fullWidth" />
                        {makeColumn("Name", s.subName )}
                        <Divider variant="fullWidth" />
                        {makeColumn( "About",s.subAbout  )}
                        <Divider variant="fullWidth" />
                        {makeColumn( "Address Line 1",s.subAdd1 )}
                        <Divider variant="fullWidth" />
                        {makeColumn( "Address Line 2",s.subAdd2 )}
                        <Divider variant="fullWidth" />
                        {makeColumn( "Post",s.subPost   )}
                        <Divider variant="fullWidth" />
                        {makeColumn( "City",s.subCity   )}
                        <Divider variant="fullWidth" />
                        {makeColumn( "State",s.subState )}
                        <Divider variant="fullWidth" />
                        {makeColumn( "Pincode",s.subPincode)}
                        <Divider variant="fullWidth" />
                        {makeColumn( "Mobile",s.subPhone )}
      </Typography>
    </Card>
  </>);
}

function DisplayEditSubscriptionApplication (props) {
  const s = props.subEditData
  const styles = useStyles();
  return (
    <Card variant="outlined" >
      <Typography variant="button"
        align="left" color="textSecondary"
      >
                        
                        {makeColumn("Subscriber Code (SC)", s.subId )}
                        <Divider variant="fullWidth" />
                        {makeColumn("Subscription Id", s.subscriptionId)}
                        <Divider variant="fullWidth" />
                        {makeColumn("Plan", <>{s.subPlan} Years</>)}
                        <Divider variant="fullWidth" />
                        {makeColumn("Valid for Volume Number", <> {s.subStartVol} --{'>'} {s.subEndVol}</>)}
                        <Divider variant="fullWidth" />
                        {makeColumn("Distributor Id", s.subDistId)}
                        <Divider variant="fullWidth" />
                        {makeColumn("Slip No.", s.subSlipNum)}
                        <Divider variant="fullWidth" />
                        {makeColumn("Subscription Type", "New")}
                        <Divider variant="fullWidth" />
                        {makeColumn("Subscription Medium", s.subMedium)}
      </Typography>
    </Card>

  );
}

function DisplayRenewSubscriptionApplication (props) {
  const s = props.renewSubscriptionData
  const styles = useStyles();
  return (
    <Card variant="outlined" >
      <Typography variant="button"
        align="left" color="textSecondary"
      >
                        
                        {makeColumn("Subscriber Code (SC)", s.subId )}
                        <Divider variant="fullWidth" />
                        {makeColumn("Last Subscription Id", s.subscriptionId)}
                        <Divider variant="fullWidth" />
                        {makeColumn("Plan", <>{s.subPlan} Years</>)}
                        <Divider variant="fullWidth" />
                        {makeColumn("Valid for Volume Number", <> {s.subStartVol} --{'>'} {s.subEndVol}</>)}
                        <Divider variant="fullWidth" />
                        {makeColumn("Distributor Id", s.subDistId)}
                        <Divider variant="fullWidth" />
                        {makeColumn("Slip No.", s.subSlipNum)}
                        <Divider variant="fullWidth" />
                        {makeColumn("Subscription Type", s.subType)}
                        <Divider variant="fullWidth" />
                        {makeColumn("Subscription Medium", s.subMedium)}
      </Typography>
    </Card>

  );
}