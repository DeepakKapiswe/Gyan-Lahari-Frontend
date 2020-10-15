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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SubscriberCard from '../SubscriberCard/SubscriberCard';
import logo from '../../assets/img/logo_small.png';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
    [theme.breakpoints.up('sm')]: {
      minWidth:500
    },
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
    backgroundColor: '#ebe5e1',
  },
}));

export default function SubscriptionApplicationCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" variant="rounded" 
            className={classes.avatar} 
            src={logo} alt="" />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={"Application Serial : " + props.serial}
        subheader="October 15, 2020"
      />
      <CardHeader
        subheader="Applied By: UserName"
      />
      <CardContent>
        <SubscriberCard subscriberDetails={props.subscriberData || sample} />
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Here we can write description of about the application and transaction details
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>More Details can be provided here</Typography>
          
        </CardContent>
      </Collapse>
    </Card>
  );
}

const sample = {"subPost":"sample Post","subAdd2":"पुरानी बाज़ार","subSubscriptionType":3,
                "subPhone":"9829284949","subDistId":"98","subState":"बिहार","subStartVol":80,
                "subSlipNum":1232,
                "subAdd1":"भवानीपुर टोला",
                "subName":"Sample Name",
                "subCity":"जमुई",
                "subRemark":"",
                "subEndVol":91,
                "subPincode":"328721","subAbout":"Sample Address","subId":"BDAC"}
