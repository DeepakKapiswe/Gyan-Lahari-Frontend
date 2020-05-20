import React from 'react';
import {useForm} from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useNavigate } from "@reach/router"
import FlowerDiv from '../FlowerDiv/FlowerDiv';


const useStyles = makeStyles(theme => (
  {
    root: {
    },
    paper: {
      margin: theme.spacing(0, 0, 2, 0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    names: {
      margin: theme.spacing(0, 0, 0, 1),
    },
    bgColor: {
      flexGrow: 1,
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(5),
      },
      // backgroundColor: '#f0f5ce'
      // background: 'linear-gradient(to right, #190A05, #870000)'
      // background: 'linear-gradient(to bottom,  rgba(255,197,120,1) 6%,rgba(255,197,120,1) 17%,rgba(255,197,120,1) 29%,rgba(255,197,120,1) 29%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 49%,rgba(255,197,120,1) 60%,rgba(255,197,120,1) 60%,rgba(251,157,35,1) 97%,rgba(251,157,35,1) 98%,rgba(251,157,35,1) 98%,rgba(251,157,35,1) 100%,rgba(251,157,35,1) 101%)',
       backgroundColor: '#ebf5ab',

    },
    heading: {
      // color: '#ffffff',
      color: '#110F4C',
      [theme.breakpoints.up('sm')]: {
        fontSize: '3rem',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
      },
    },
    form: {
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
export default function ExpiryListForm(props) {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const distId = props.location.state.distributor.distId;
  const dD = props.location.state.distributor;
  const onSubmit = data => {
    data.eldExpiryVol          = data.eldExpiryVol*1
    data.eldExpiryYearDuration = data.eldExpiryYearDuration*1
    navigate("/expiryList", {state:{eldDetails:data, distDetails:dD }})
  };

  const classes = useStyles();

  function RenderHeading(props) {
    return (
      <Grid item alignItems="center" >
        <Typography variant="h2" component="h3"
          className={classes.heading} align="center">
             Expiry Chart Details
        </Typography>
        <Typography variant="h2" component="h3"
          className={classes.heading} align="center">
             ऐक्सपायरी पर्ची विवरण
        </Typography>
        <FlowerDiv/>
      </Grid>)
  }

  function RenderForm() {
    return (
      <Container maxWidth='sm'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}
            className={classes.form}
            component={Paper} elevation={6}
            direction="column"
            justify="flex-start"
            alignItems="stretch"
          >
            <Grid item>
              <TextField
                inputRef={register}
                required
                id="eldDistId"
                name="eldDistId"
                label="For Distributor Id"
                autoComplete="eldDistId"
                disabled
                defaultValue={distId}
              />
            </Grid>
            <Grid item>
              <TextField
                inputRef={register}
                required
                fullWidth
                hidden
                type="number"
                id="eldExpiryVol"
                name="eldExpiryVol"
                label="Expiries Before Issue Number : "
                autoComplete="eldExpiryVol"
              />
            </Grid>
            <Grid item>
              <TextField
                inputRef={register}
                required
                fullWidth
                hidden
                type="number"
                id="eldExpiryYearDuration"
                name="eldExpiryYearDuration"
                label="Expiry List For Years : "
                autoComplete="eldExpiryYearDuration"
              />
            </Grid>
            <Grid container justify="center">
              <Grid item >
                <Button
                  type="submit"
                  name="getExpiryList"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Get Expiry List
                  </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  }
  return (
    <Grid
      container xs
      className={classes.bgColor}
      direction="row-reverse"
      justify="center"
      alignItems="center"
    >
      <Grid className={classes.paper} >
        <CssBaseline>
         <>
           <RenderHeading />
           <RenderForm />
         </>
        </CssBaseline>
      </Grid>
    </Grid>
  );
}
