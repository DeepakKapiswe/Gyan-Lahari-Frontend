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

import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useEffect } from 'react';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const distributorIdList = ['All Distributors'];
for (var i = 1; i <= 200; i++) {
    distributorIdList.push(i);
}



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
      background: 'linear-gradient(to right, #190A05, #870000)'

    },
    heading: {
      color: '#ffffff',
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
  
export default function BulkDistributionListForm(props) {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
 
  useEffect(() => {
    register({ name: "distributorIds" });
    register({ name: "dldCurrentVol" });
  });

  const onSubmit = data => {
    //data.dldCurrentVol = data.dldCurrentVol*1
    // navigate("/distributionList", {state:{dldDetails:data, distDetails:dD }})
    console.log(data)
  };

  const classes = useStyles();

  function RenderHeading(props) {
    return (
      <Grid item alignItems="center" >
        <Typography variant="h2" component="h3"
          className={classes.heading} align="center">
             Distribution Chart Details
        </Typography>
        <Typography variant="h2" component="h3"
          className={classes.heading} align="center">
             पर्ची विवरण
        </Typography>
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
            <Autocomplete
              id="distributorIds"
              name="distributorIds"
              fullWidth 
              multiple
              options={distributorIdList}
              disableCloseOnSelect
              onChange={(e, data) => {
                setValue("distributorIds", data);
              }}
              getOptionLabel={(option) => option.toString()}
              renderOption={(option, { selected }) => (
                <>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                 {option}
                </>
              )}
              renderInput={(params) => (
                <TextField 
                  {...params}
                  variant="outlined" 
                  label="Choose Distributor ID"
                  placeholder="Choose Distributor ID" 
                />
              )}
              />
            </Grid>
            <Grid item>
              <TextField
                // inputRef={register}
                required
                onChange={(e) => {
                    setValue("dldCurrentVol",e.target.value);
                  }}
                type="number"
                id="dldCurrentVol"
                name="dldCurrentVol"
                label="For Issue Number"
                autoComplete="dldCurrentVol"
                fullWidth
              />
            </Grid>
            <Grid container justify="center">
              <Grid item >
                <Button
                  type="submit"
                  name="getDistributionList"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Prepare Distribution List
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



