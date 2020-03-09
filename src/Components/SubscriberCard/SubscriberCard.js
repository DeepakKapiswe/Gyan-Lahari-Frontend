import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const SubscriberEditForm = React.lazy(() => import('../SubscriberEditForm/SubscriberEditForm'));

const useStyles = makeStyles(({ breakpoints, spacing, shadows }) => ({
  card: {
    width: '100%',
    maxWidth: 500,
    borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    overflow: 'initial',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-around',
    paddingLeft: 3,
    paddingRight: 3,
    background:
      'linear-gradient(34deg, rgba(55,16,83,1) 0%, rgba(162,73,190,1) 29%, rgba(33,16,83,1) 92%)',
    [breakpoints.up('sm')]: {
      textAlign: 'left',
    },
  },
  cardSmall: {
    width: '100%',
    minWidth: 85,
    maxWidth: 100,

    borderRadius: spacing(0.9), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    overflow: 'initial',
    display: 'flex',
    flexDirection: 'column',
    justify: 'center',
    textAlign: 'center',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    // background: 'rgb(248,255,16)',
    background:
      'linear-gradient(146deg, rgba(248,255,16,0.7077205882352942) 1%, rgba(254,255,254,1) 20%, rgba(194,247,143,1) 65%)',
    [breakpoints.up('sm')]: {
      textAlign: 'center',
    },
  },
  overline: {
    lineHeight: 1.5,
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '1.1rem',
    opacity: 0.8,
  },
  heading: {
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
    fontSize: '1.5rem',
  },
  cardcontent: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,

    lineHeight: 1.5,
    fontWeight: '900',
    opacity: 0.95,
    color: '#220a70',
    fontSize: '1.1rem',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 9,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#ffffff',
    textTransform: 'none',
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.32)',
    },
    [breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: '#E6FFC4',
    border: '2px solid #000',
    boxShadow: shadows[5],
   // padding: spacing(2, 4, 3),
  },
  
}));

export default function SubscriberCard(props) {
  const styles = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const sp = " ";
  const sD = props.subscriberDetails;

    return (
      <>
      <Container maxWidth="sm">
        <Card className={styles.card}>
          <CardContent className={styles.content}>
            <Grid item>
              <Typography variant="h5" component="h2"
                className={styles.heading} gutterBottom>
                {sD.subName}
              </Typography>
            </Grid>
            <Grid container
              spacing={1}
              direction="row"
              alignItems="flex-end"
            >
              <Grid item xs container>
                <Grid container
                  component={Typography}
                  spacing={0}
                  direction="column"
                  justify="flex-start"
                  alignItems="baseline"
                >

                  <Grid item>
                    <Typography className={styles.overline} gutterBottom variant={'overline'}>
                      {sD.subAbout}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={styles.overline} gutterBottom variant={'overline'}>
                      {sD.subAdd1}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={styles.overline} gutterBottom variant={'overline'}>
                      {sD.subAdd2}
                    </Typography>
                  </Grid>
                  <Grid item >
                    <Typography className={styles.overline} gutterBottom variant={'overline'}>
                      {sD.subPost}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={styles.overline} gutterBottom variant={'overline'}>
                      {sD.subCity}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={styles.overline} gutterBottom variant={'overline'}>
                      {sD.subState}
                    </Typography>{sp}{sp}{sp}{sp}
                    <Typography className={styles.overline} gutterBottom variant={'overline'}>
                      {sD.subPincode}
                    </Typography>
                  </Grid>
                  <Grid item>
                  </Grid>
                  <Grid item>
                    <Typography className={styles.overline} gutterBottom variant={'overline'}>
                      {sD.subPhone}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid
                  container
                  spacing={1}
                  direction="column"
                  justify="flex-start"
                  alignItems="strech"
                >
                  <Grid item>
                    <Card className={styles.cardSmall}>
                      <CardContent className={styles.cardcontent}>
                        <Typography variant={'subtitle'} gutterBottom>
                          SC : ABCD
                  </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item>
                    <Card className={styles.cardSmall}>
                      <CardContent className={styles.cardcontent}>
                        <Typography variant={'subtitle'} gutterBottom>
                          DC : {sD.subDistId}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item>
                    <Card className={styles.cardSmall}>
                      <CardContent className={styles.cardcontent}>
                        <Typography variant={'subtitle'} gutterBottom >
                          {sD.subSubscriptionType} Year <br />
                          {sD.subStartVol}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions disableSpacing>
            <Grid container
              justify="space-around"
            >
              <Grid item>
                <Button size="small" color="primary"
                  className={styles.button}
                  // onClick={handleEditViewClick}
                  onClick={handleOpen}>
                  Edit
        </Button>
              </Grid>
              <Grid item>
                <Button size="small" color="primary" className={styles.button}
                  onClick={handleExpandClick}>
                  Show More
        </Button>
              </Grid>
            </Grid>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Grid item>
                <Typography className={styles.overline} gutterBottom variant={'body1'}>
                  Subscription Status: <br /> Expiry here
              </Typography>
                <Divider variant="middle" />
              </Grid>
              <Typography paragraph className={styles.overline} gutterBottom variant={'body1'}>
                Contact Person: <br />Distributor Name And Number Here
            </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Container>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={styles.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        disableBackdropClick
        disableScrollLock
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid container 
            className={styles.paper }
            direction="column"
            justify="center"
            alignItems="center"
          >

          <Grid item>
            {/* <h2 id="transition-modal-title">Transition modal</h2> */}
            {/* <SubscriberDetails subscriber={sD} /> */}
            <SubscriberEditForm subscriberDetails={sD} />
            {/* <p id="transition-modal-description">react-transition-group animates me.</p> */}
            
              
            </Grid>
            <Grid item>
                <Button size="large" color="primary" variant="contained"
                  onClick={handleClose}>
                  Exit
                </Button>
                  </Grid>
                  </Grid>
        </Fade>
      </Modal>
      </>
    )
  };