import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SubscriberCard from '../SubscriberCard/SubscriberCard';
import TimerOutlinedIcon from '@material-ui/icons/TimerOutlined';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import logo from '../../assets/img/logo_small.png';
import { useSaveNextLocation } from '../../Hooks/SaveLocation';
import { useNavigate } from '@reach/router';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import useSWR from 'swr';
import {url_approveSubscriberApplication} from '../../apiEndpoints/api';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 500,
        [theme.breakpoints.up('sm')]: {
            minWidth: 450
        },
        backgroundColor: '#fdffe3',
        //  backgroundImage: 'linear-gradient(45deg, #ffffff 0%, #ffecec 89%, #ffffff 99%)'


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
    // const appData = props.applicationData;
    const [appData, setAppData] = React.useState(props.applicationData);
    const serial = appData.saApplicationId || 625172;
    const subscriberData = appData.saSubscriberData || sample;
    const [expanded, setExpanded] = React.useState(false);
    const saveNextLocation = useSaveNextLocation();
    const navigate = useNavigate();

    function FetchApprovedAppication() {
        const applicationData = {
            arApplicationIds : [serial],
            arProcessedBy : "SOME / USER NAME HERE"
        } 
        const url = url_approveSubscriberApplication;
        const fetcher = (...args) => fetch(url, {
            method: 'post',
            headers: {
            "Content-Type": "application/json",
            'Accept':  'application/json',
            'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
            },
            body: JSON.stringify(applicationData)
        }).then(res => res.ok ? res.json() : res.status);

       const { data, error} = useSWR(url, fetcher, { suspense: true, refreshInterval: 99999999999999 , revalidateOnFocus: false });
//   if (newSubscriberData.subName === '') {return <div>Empty Query</div>}
//  if (error) return <div>failed to load</div>
  // if (!data) return <LinearProgress/>
  if (data === 401) return <LoginPrompt/>
     setAppData(data.arApplication);
     console.log(data,"useEffect");
     return <></>;

    }
    function fetchApprovedAppication() {
        const applicationData = {
            arApplicationIds : [serial],
            arProcessedBy : "SOME USER NAME HERE"
        } 
        const url = url_approveSubscriberApplication;
        const data = fetch(url, {
            method: 'post',
            headers: {
            "Content-Type": "application/json",
            'Accept':  'application/json',
            'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
            },
            body: JSON.stringify(applicationData)
        }).then(res => res.ok ? res.json() : res.status);
//   if (data === 401) return <LoginPrompt/>
    //  setAppData(data.arApplication);
     console.log(data,"useEffect");

    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleApproveClick = () => {
        // saveNextLocation("/approveApplication", {state:{appData:appData}});
        // navigate("/approveApplication", {state:{appData:appData}});
        console.log("button clicked");
        fetchApprovedAppication();
  };

    const pending = <Chip
        icon={<TimerOutlinedIcon />} label="Pending"
        color="secondary"
    />;
    const approved = <Chip
        icon={<AssignmentTurnedInIcon />} label="Approved"
        color="Primary"
    />;

    const status = appData.saAppStatus === 'Pending' ? pending :
        appData.saAppStatus === 'Approved' ? approved :
            null;
    

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="logo-awatar" variant="rounded"
                        className={classes.avatar}
                        src={logo} alt="" />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={"Application Serial : " + serial}
                subheader={<>
                    {"October 15, 2020"} <br />
                    {"Application Status : "}
                    {status}
                </>}
            />

            <CardContent>
                <SubscriberCard subscriberDetails={subscriberData} />
            </CardContent>
            <CardContent>
                <Typography variant="body1" color="textPrimary" component="p">
                    Here we can write description of about the application and transaction details
        </Typography>
            </CardContent>
            <CardActions disableSpacing >
                <Button color="primary"
                      onClick={handleApproveClick}
                    startIcon={<CheckCircleOutlineIcon/>}
                    variant="contained"
                >
                    Approve
                </Button>
                <Button color="secondary"
                    //   onClick={handleRejectClick}
                    variant="contained"
                    startIcon={<DeleteIcon/>}
                >
                    Reject
                </Button>
                {/* <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton> */}

            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>More Details can be provided here</Typography>

                </CardContent>
            </Collapse>
        </Card>
    );
}

const sample = {
    "subPost": "sample Post", "subAdd2": "पुरानी बाज़ार", "subSubscriptionType": 3,
    "subPhone": "9829284949", "subDistId": "98", "subState": "बिहार", "subStartVol": 80,
    "subSlipNum": 1232,
    "subAdd1": "भवानीपुर टोला",
    "subName": "Sample Name",
    "subCity": "जमुई",
    "subRemark": "",
    "subEndVol": 91,
    "subPincode": "328721", "subAbout": "Sample Address", "subId": "BDAC"
}
