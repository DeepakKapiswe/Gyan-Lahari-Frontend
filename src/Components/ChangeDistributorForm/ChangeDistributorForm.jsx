import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useNavigate } from "@reach/router";
import BackButton from "../BackButton/BackButton";
import FlowerDiv from "../FlowerDiv/FlowerDiv";
import { Card, Divider } from "@material-ui/core";
import {
  useSaveLastLocation,
  useSaveNextLocation,
} from "../../Hooks/SaveLocation";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(0, 0, 2, 0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // fixed typo
  },
  names: {
    margin: theme.spacing(0, 0, 0, 1),
  },
  bgColor: {
    flexGrow: 1,
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(15),
    },
    backgroundColor: "#ebf5ab",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
  },
  heading: {
    color: "#110F4C",
    [theme.breakpoints.up("sm")]: {
      fontSize: "3rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  form: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SubscriberEditForm(props) {
  const navigate = useNavigate();

  // --- SAFE LOAD of oldDetails (prevents null/JSON errors) ---
  const oldDetails = (() => {
    if (props?.location?.state?.lastSubscription) {
      return props.location.state.lastSubscription;
    }
    try {
      const raw = sessionStorage.getItem("sD");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const [sD, setSD] = useState(oldDetails);
  const { register, handleSubmit } = useForm();
  const [userResult, setUserResult] = useState(null);
  const saveLastLocation = useSaveLastLocation();
  const saveNextLocation = useSaveNextLocation();
  saveLastLocation();

  // --- BUILD plans array and FILTER out falsy entries ---
  const plans = useMemo(() => {
    const arr = [];
    if (sD?.currPlan) arr.push(sD.currPlan);
    if (Array.isArray(sD?.upcomingPlans)) arr.push(...sD.upcomingPlans);
    return arr.filter(Boolean); // <- the critical fix
  }, [sD]);

  const onSubmit = (data) => {
    data.subDistId = data.newDistId; // preserving your intent
    const changeDistributorData = {
      newDistId: data.newDistId,
      plansToUpdate: plans, // use already-filtered plans
    };
    saveNextLocation("/patrika/changeDistributorResult", {
      state: { changeDistributorData },
    });
    navigate("/patrika/changeDistributorResult", {
      state: { changeDistributorData },
      replace: true,
    });
  };

  const onReset = () => setSD(oldDetails);

  const classes = useStyles();

  function RenderResult(props) {
    if (props.result !== null) return <>{userResult}</>;
    return (
      <Grid item alignItems="center">
        <Typography
          variant="h2"
          component="h3"
          className={classes.heading}
          align="center"
        >
          Change Distributor Form
        </Typography>

        <Typography
          variant="h2"
          component="h3"
          className={classes.heading}
          align="center"
        >
          वितरक परिवर्तन
        </Typography>
        <FlowerDiv />
      </Grid>
    );
  }

  if (!sD) {
    return (
      <>
        <h1>Bad Request</h1>
        <BackButton />
      </>
    );
  }

  return (
    <>
      {/* Note: 'xs' prop is for items, not container. Removing it to avoid warnings. */}
      <Grid
        container
        className={classes.bgColor}
        direction="row-reverse"
        justify="center"
        alignItems="center"
      >
        <Container maxWidth="xs">
          <CssBaseline>
            <>
              <RenderResult result={userResult} />
              <form onSubmit={handleSubmit(onSubmit)}>
                <React.Fragment>
                  <Grid
                    container
                    spacing={2}
                    className={classes.form}
                    component={Paper}
                    elevation={6}
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Grid item xs={6} sm={4} lg={3}>
                      <TextField
                        inputRef={register}
                        inputProps={{
                          style: { fontSize: 30, fontWeight: 700 }, // fontSize fix
                        }}
                        type="number"
                        id="subDistId"
                        name="subDistId"
                        label="Old Distributor Id"
                        autoComplete="subDistId"
                        disabled
                        defaultValue={sD.subDistId ?? sD.subdistid}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} lg={3}>
                      <TextField
                        inputRef={register}
                        inputProps={{
                          style: { fontSize: 30, fontWeight: 700 }, // fontSize fix
                        }}
                        required
                        type="number"
                        id="newDistId"
                        name="newDistId"
                        label="New Distributor Id"
                        defaultValue={sD.subDistId ?? sD.subdistid}
                      />
                    </Grid>
                    <Grid container justify="center" alignItems="stretch">
                      <Grid item>
                        <Button
                          type="submit"
                          name="renewSubscription"
                          fullWidth
                          variant="contained"
                          color="secondary"
                          className={classes.submit}
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </React.Fragment>
              </form>

              <Typography variant="h6">
                Subscriber And Old Subscription Details
              </Typography>

              <Grid
                container
                spacing={3}
                className={classes.form}
                component={Paper}
                elevation={6}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={12}>
                  <DisplaySubscriberDetails subData={sD} />
                </Grid>

                {plans.length === 0 ? (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">
                      No current or upcoming subscriptions found.
                    </Typography>
                  </Grid>
                ) : (
                  plans.map((plan, i) => (
                    <Grid
                      item
                      xs={12}
                      key={plan?.subscriptionid ?? plan?.id ?? i} // stable key
                    >
                      <DisplaySubscription lastSubscriptionData={plan} />
                    </Grid>
                  ))
                )}
              </Grid>

              <BackButton />
            </>
          </CssBaseline>
        </Container>
      </Grid>
    </>
  );
}

const makeColumn = (str, comp) => {
  return (
    <Grid container justify="space-between" alignItems="baseline" spacing={1}>
      <Grid item>
        <Typography variant="button" color="textSecondary">
          <i>{str}</i>
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" align="right">
          <b>{comp}</b>
        </Typography>
      </Grid>
    </Grid>
  );
};

function DisplaySubscription(props) {
  const s = props.lastSubscriptionData;

  // --- GUARD against null/undefined to prevent the crash ---
  if (!s) {
    return (
      <Card variant="outlined">
        <Typography variant="button" align="left" color="textSecondary">
          No subscription data.
        </Typography>
      </Card>
    );
  }

  return (
    <Card variant="outlined">
      <Typography variant="button" align="left" color="textSecondary">
        {makeColumn(<b>Subscription ID : {s.subscriptionid}</b>)}
        <Divider variant="fullWidth" />
        {makeColumn("Subscriber Code (SC)", s.subid)}
        <Divider variant="fullWidth" />
        {makeColumn("Plan", <>{s.subplan} Years</>)}
        <Divider variant="fullWidth" />
        {makeColumn(
          "Valid for Volume Number",
          <>
            {s.substartvol} --{">"} {s.subendvol}
          </>
        )}
        <Divider variant="fullWidth" />
        {makeColumn("Distributor Id", s.subdistid ?? s.subDistId)}
        <Divider variant="fullWidth" />
        {makeColumn("Slip No.", s.subslipnum)}
        <Divider variant="fullWidth" />
        {makeColumn("Subscription Type", s.subtype)}
        <Divider variant="fullWidth" />
        {makeColumn("Subscription Medium", s.submedium)}
      </Typography>
    </Card>
  );
}

function DisplaySubscriberDetails(props) {
  const s = props.subData;
  return (
    <Card variant="outlined">
      <Typography variant="button" align="left" color="textSecondary">
        {makeColumn(<b>Subscriber Address Details</b>)}
        <Divider variant="fullWidth" />
        {makeColumn("Name", s.subName)}
        <Divider variant="fullWidth" />
        {makeColumn("About", s.subAbout)}
        <Divider variant="fullWidth" />
        {makeColumn("Address Line 1", s.subAdd1)}
        <Divider variant="fullWidth" />
        {makeColumn("Address Line 2", s.subAdd2)}
        <Divider variant="fullWidth" />
        {makeColumn("Post", s.subPost)}
        <Divider variant="fullWidth" />
        {makeColumn("City", s.subCity)}
        <Divider variant="fullWidth" />
        {makeColumn("State", s.subState)}
        <Divider variant="fullWidth" />
        {makeColumn("Pincode", s.subPincode)}
        <Divider variant="fullWidth" />
        {makeColumn("Mobile", s.subPhone)}
      </Typography>
    </Card>
  );
}
