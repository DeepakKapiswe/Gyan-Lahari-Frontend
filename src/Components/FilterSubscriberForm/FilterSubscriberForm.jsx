import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { useFieldArray, useForm, Controller, useWatch } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useNavigate } from "@reach/router";
import FlowerDiv from '../FlowerDiv/FlowerDiv';
import { useSaveLastLocation, useSaveNextLocation } from '../../Hooks/SaveLocation';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Fab } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(theme => (
    {
        root: {
            width: '100%',
            maxWidth: 360,
            maxHeight: '35vh',
            overflow: 'scroll',
            border: '3px solid #B6DBCB',
            boxShadow: theme.shadows[9],
            backgroundColor: theme.palette.background.paper,
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
            backgroundColor: '#ebf5ab'

        },
        heading: {
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
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        cardHeading: {
            color: '#050355',
            [theme.breakpoints.up('sm')]: {
                fontSize: '2rem',
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: '1.4rem',
            },
        },
        gridCard: {
            flexGrow: 1,
            width: '100%',
        },
        color: {
            height: '35vh',
            width: 360,
            flexGrow: 1,
            overflow: 'scroll',
            border: '3px solid #B6DBCB',
            boxShadow: theme.shadows[9],
            alignItems: 'center',
            display: 'list-item',
            background: '#fafafa'
        },
        card: {
            width: '100%',
            maxWidth: 500,
            borderRadius: theme.spacing(2), // 16px
            transition: '0.3s',
            boxShadow: theme.shadows[20],
            position: 'relative',
            overflow: 'initial',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'space-around',
            paddingLeft: 3,
            paddingRight: 3,
            background:
                'linear-gradient(90deg, rgba(231,228,222,1) 0%, rgba(246,230,203,0.8897934173669468) 2%, rgba(255,245,219,0.8925945378151261) 39%, rgba(249,246,224,0.9037990196078431) 87%)',
            [theme.breakpoints.up('sm')]: {
                textAlign: 'left',
            },
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
        extendedIcon: {
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(2),
        },
        margin: {
            margin: theme.spacing(2),
        },
        fab: {
            position: 'fixed',
            [theme.breakpoints.up('sm')]: {
                top: theme.spacing(20),
            },
            [theme.breakpoints.down('sm')]: {
                bottom: theme.spacing(8),
            },
            right: theme.spacing(4),
        },
    }));

const numberFields = [
        "subStartVol",
        "subEndVol",
        "subSubscriptionType",
        "subSlipNum"
        ]


function RenderHeading(props) {
    const classes = useStyles();
    return (
        <Grid alignItems="center" >
            <Typography variant="h2" component="h3"
                className={classes.heading} align="center">
                {props.heading}
            </Typography>
            <FlowerDiv />
        </Grid>
    )
}

function RenderOne({ control, register, fieldName }) {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { fields, append, remove } = useFieldArray(
        {
            control,
            name: `filterOptions.${fieldName}`
        }
    );
    return (
        <>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Grid item>
                        <Typography variant="h5" component="h4"
                            className={classes.cardHeading} gutterBottom>
                            {fieldName}
                        </Typography>
                    </Grid>
                    <Divider />
                    <Grid container
                        spacing={1}
                        direction="row"
                        alignItems="flex-end"
                    >
                    </Grid>
                </CardContent>
                <CardActions disableSpacing>
                    <Grid container
                        justify="space-around">
                        {fields.length > 0 && <Grid item>
                            <Button size="small" color="primary"
                                variant="outlined"
                                onClick={() => {
                                    remove([...Array(fields.length).keys()])
                                }
                                }
                            >
                                Clear Filter
                                </Button>
                        </Grid>}
                        <Grid item>
                            <Button size="small" color="primary"
                                onClick={handleExpandClick} variant="outlined"
                            >
                                Show {expanded ? 'More' : 'Less'}
                            </Button>
                        </Grid>
                    </Grid>
                </CardActions>
                <Collapse in={!expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Grid item>
                            {fields.map((fv, index) => {
                                const inputField = <Grid container
                                    spacing={1}
                                    justify="center"
                                    alignItems="center">
                                    <Grid item>
                                        <TextField
                                            inputRef={register()}
                                            type={numberFields.includes({fieldName}) ? "number" : "text"}
                                            fullWidth
                                            name={`filterOptions.${fieldName}`}
                                            autoComplete={`filterOptions.${fieldName}`}
                                            defaultValue={fv.value}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            type="button"
                                            onClick={() => remove(index)}
                                            color="secondary"
                                            size="small"
                                            variant="contained"
                                            endIcon={<DeleteIcon />}
                                        >
                                            Remove
                                    </Button>
                                    </Grid>
                                </Grid>
                                return <div key={fv.id}>
                                    <Controller
                                        as={inputField}
                                        name={`filterOptions.${fieldName}[${index}]`}
                                        control={control}
                                        register={register}
                                        defaultValue=""
                                    />
                                </div>
                            })}
                        </Grid>
                        <Grid item>
                            <Button
                                type="button"
                                onClick={() => append("")}
                                color="primary"
                                size="small"
                                variant="contained"
                                startIcon={<AddIcon />}
                            >
                                Add More
                                    </Button>
                        </Grid>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    );
}




const fieldNames = [
    "subId",
    "subStartVol",
    "subSubscriptionType",
    "subSlipNum",
    "subName",
    "subAbout",
    "subAdd1",
    "subAdd2",
    "subPost",
    "subCity",
    "subState",
    "subPincode",
    "subPhone",
    "subRemark",
    "subDistId",
    "subEndVol",
]

const defaultValues = {
            filterOptions: [],
            subId: false,
            subStartVol: false,
            subSubscriptionType: false,
            subSlipNum: false,
            subName: false,
            subAbout: false,
            subAdd1: false,
            subAdd2: false,
            subPost: false,
            subCity: false,
            subState: false,
            subPincode: false,
            subPhone: false,
            subRemark: false,
            subDistId: false,
            subEndVol: false,
        }

export default function RenderForm() {
    const navigate = useNavigate();
    const { register, control, handleSubmit, reset, setValue } = useForm({ defaultValues });
    const saveLastLocation = useSaveLastLocation();
    const saveNextLocation = useSaveNextLocation();
    saveLastLocation();
    const onSubmit = data => {
        if (data.filterOptions === undefined)  {alert('Please put some data in filter Details');}
        else {
        saveNextLocation("/filterResult", { state: { filterOptions: data.filterOptions } });
        navigate("/filterResult", { state: { filterOptions: data.filterOptions } })
    }};

    const classes = useStyles();


    const subId = useWatch({ control, name: "subId", defaultValue: false });
    const subStartVol = useWatch({ control, name: "subStartVol", defaultValue: false });
    const subSubscriptionType = useWatch({ control, name: "subSubscriptionType", defaultValue: false });
    const subSlipNum = useWatch({ control, name: "subSlipNum", defaultValue: false });
    const subName = useWatch({ control, name: "subName", defaultValue: false });
    const subAbout = useWatch({ control, name: "subAbout", defaultValue: false });
    const subAdd1 = useWatch({ control, name: "subAdd1", defaultValue: false });
    const subAdd2 = useWatch({ control, name: "subAdd2", defaultValue: false });
    const subPost = useWatch({ control, name: "subPost", defaultValue: false });
    const subCity = useWatch({ control, name: "subCity", defaultValue: false });
    const subState = useWatch({ control, name: "subState", defaultValue: false });
    const subPincode = useWatch({ control, name: "subPincode", defaultValue: false });
    const subPhone = useWatch({ control, name: "subPhone", defaultValue: false });
    const subRemark = useWatch({ control, name: "subRemark", defaultValue: false });
    const subDistId = useWatch({ control, name: "subDistId", defaultValue: false });
    const subEndVol = useWatch({ control, name: "subEndVol", defaultValue: false });

    var fieldObj = {
        "subId": subId,
        "subStartVol": subStartVol,
        "subSubscriptionType": subSubscriptionType,
        "subSlipNum": subSlipNum,
        "subName": subName,
        "subAbout": subAbout,
        "subAdd1": subAdd1,
        "subAdd2": subAdd2,
        "subPost": subPost,
        "subCity": subCity,
        "subState": subState,
        "subPincode": subPincode,
        "subPhone": subPhone,
        "subRemark": subRemark,
        "subDistId": subDistId,
        "subEndVol": subEndVol,
    }


    const isSelected = subId 
        || subStartVol || subSubscriptionType || subSlipNum 
        || subName || subAbout || subAdd1 || subAdd2 || subPost 
        || subCity || subState || subPincode || subPhone 
        || subRemark || subDistId || subEndVol;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
                container xs
                className={classes.bgColor}
                direction="column"
                justify="center"
                alignItems="center"
            >
                <Grid item>
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
                                    <Grid container direction="row"
                                        justify="center"
                                        alignItems="center"
                                        spacing={6}
                                    >
                                        <Grid item>
                                            <RenderHeading heading="Filter Options" />
                                            <List className={classes.root}>
                                                {fieldNames.map((name) => <>
                                                    <ListItem key={name} role={undefined} dense button
                                                        onClick={() => {
                                                            setValue(name, !fieldObj[name]);
                                                        }}
                                                    >
                                                        <ListItemIcon>
                                                                <Checkbox
                                                                  name={name}
                                                                  inputProps={{'ref' : register}}
                                                                  checked={fieldObj[name]}
                                                                  edge="start"
                                                                  tabIndex={-1}
                                                                  disableRipple
                                                                  defaultValue={fieldObj[name]}
                                                                />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography> {name}</Typography>} />
                                                    </ListItem>
                                                    <Divider />
                                                </>
                                                )}
                                            </List>
                                        </Grid>

                                        {isSelected &&
                                            <Grid item>
                                                <RenderHeading heading="Filter Details" />
                                                <List className={classes.root}>
                                                    {subId === true && <RenderOne control={control} register={register} fieldName="subId" />}
                                                    {subStartVol === true && <RenderOne control={control} register={register} fieldName="subStartVol" />}
                                                    {subSubscriptionType === true && <RenderOne control={control} register={register} fieldName="subSubscriptionType" />}
                                                    {subSlipNum === true && <RenderOne control={control} register={register} fieldName="subSlipNum" />}
                                                    {subName === true && <RenderOne control={control} register={register} fieldName="subName" />}
                                                    {subAbout === true && <RenderOne control={control} register={register} fieldName="subAbout" />}
                                                    {subAdd1 === true && <RenderOne control={control} register={register} fieldName="subAdd1" />}
                                                    {subAdd2 === true && <RenderOne control={control} register={register} fieldName="subAdd2" />}
                                                    {subPost === true && <RenderOne control={control} register={register} fieldName="subPost" />}
                                                    {subCity === true && <RenderOne control={control} register={register} fieldName="subCity" />}
                                                    {subState === true && <RenderOne control={control} register={register} fieldName="subState" />}
                                                    {subPincode === true && <RenderOne control={control} register={register} fieldName="subPincode" />}
                                                    {subPhone === true && <RenderOne control={control} register={register} fieldName="subPhone" />}
                                                    {subRemark === true && <RenderOne control={control} register={register} fieldName="subRemark" />}
                                                    {subDistId === true && <RenderOne control={control} register={register} fieldName="subDistId" />}
                                                    {subEndVol === true && <RenderOne control={control} register={register} fieldName="subEndVol" />}
                                                </List>
                                            </Grid>
                                        }
                                        {isSelected && <Fab
                                            size="large" color="secondary"
                                            className={classes.fab}
                                            type="submit">
                                            <SendIcon className={classes.extendedIcon} />
                                        </Fab>
                                        }
                                    </Grid>
                                </>
                            </CssBaseline>
                        </Grid>
                    </Grid>
                </Grid>

                {isSelected && <Grid
                    container
                    className={classes.bgColor}
                    direction="row-reverse"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item>
                        <Button type="submit" size="large"
                            variant="contained" color="primary"
                            endIcon={<SendIcon />} >
                            Get Results
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button size="large"
                            variant="contained" color="secondary"
                            onClick={() => reset({ ...defaultValues })}
                            type="button"
                            endIcon={<DeleteIcon/>} > 
                            Reset All
                        </Button>
                    </Grid>
                </Grid>
                }
            </Grid>
        </form>
    );
}
