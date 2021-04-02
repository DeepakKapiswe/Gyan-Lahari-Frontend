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
import { ualApprover } from '../../common/Authorization';
import Cookies from 'js-cookie';
import { useAppState } from '../../Contexts/AppContext';
import { useSaveLastLocation } from '../../Hooks/SaveLocation';
import BlockIcon from '@material-ui/icons/Block';
import { FormControlLabel, Grid, Switch } from '@material-ui/core';

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
    const [appData, setAppData] = React.useState(props.applicationData);
    const [originalData, setOriginalData] = useState(null);
    const serial = appData.saApplicationId;
    const subscriberData = appData.saSubscriberData;
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
            arProcessedBy : "SOME USER NAME HERE"
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
        const subInfo = subscriberData.subId;
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
            />

    const editDetails = <Chip
            color="default"
            label="EDIT DETAILS"
            />

    const renew = <Chip
            color="default"
            label="RENEW SUBSCRIPTION"
            />


    const statusDisplay = 
        appData.saAppStatus === 'Pending' ? pending :
        appData.saAppStatus === 'Approved' ? approved :
        appData.saAppStatus === 'Rejected' ? rejected :
        null;
    
    const appTypeDisplay =
        appData.saApplicationType === 'AddNewSubscriber' ? addNew :
        appData.saApplicationType === 'EditDetails' ? editDetails :
        appData.saApplicationType === 'RenewSubscriber' ? renew :
        null;

    return (
      loginStatus !== true ? <LoginPrompt/> :
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="logo-awatar" variant="rounded"
                        className={classes.avatar}
                        src={logo} alt="" />
                }
                action={
                    appData.saAppStatus === 'Pending' &&
                    appData.saApplicationType === 'EditDetails' &&
                     <FormControlLabel
                      value="bottom"
                      control={<Switch color="primary" onChange={toggleChecked}/>}
                      label="View Original"
                      labelPlacement="bottom"
                    />
                }
                // this can be used for adding more functions
                // action={
                //     <IconButton aria-label="settings">
                //         <MoreVertIcon />
                //     </IconButton>
                // }

                title={"Application Serial : " + serial}
                    // TODO : Application Date has to be fixed
                subheader={<>
                    {/* {"October 15, 2020"} <br />    */}
                    {"Application Type : "}
                    {appTypeDisplay} <br/>
                    {"Application Status : "}
                    {statusDisplay}
                </>}
            />

            {originalData !== null &&
             checked &&
             appData.saAppStatus === 'Pending' &&
             appData.saApplicationType === 'EditDetails' &&
             originalData[0] !== null &&
              <CardContent>
                  <p>Original: </p>
                  <SubscriberCard noActionButtons subscriberDetails={originalData[0]} />
                  <p>Proposed: </p>
              </CardContent>
            }
            <CardContent>
                <SubscriberCard noActionButtons subscriberDetails={subscriberData} />
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="textPrimary" component="p">
                    This subscription application will be approved only if confirmed by authorised personnel
                </Typography>
                <Typography variant="body2" color="textPrimary" component="p">
                    किसी भी जानकारी व सहायता के लिए सम्पर्क करें - 9155950505
                </Typography>
            </CardContent>
           { ualApprover.includes(userType) && 
             appData.saAppStatus === 'Pending' && 
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

