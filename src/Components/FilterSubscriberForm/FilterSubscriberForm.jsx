import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useNavigate } from "@reach/router";
import FlowerDiv from '../FlowerDiv/FlowerDiv';
import { useSaveLastLocation, useSaveNextLocation } from '../../Hooks/SaveLocation';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearIcon from '@material-ui/icons/Clear';
import { Fab, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import SendIcon from '@material-ui/icons/Send';

const useStylesList = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        maxHeight: '35vh',
        overflow: 'scroll',
        border: '3px solid #B6DBCB',
        boxShadow: theme.shadows[9],
        backgroundColor: theme.palette.background.paper,
    },
}));

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

export default function RenderForm() {
    const navigate = useNavigate();
    const { register, control, handleSubmit, watch } = useForm({
        defaultValues: {
            filterOptions: initFilterOptions
        }
    });
    const saveLastLocation = useSaveLastLocation();
    const saveNextLocation = useSaveNextLocation();
    saveLastLocation();
    const onSubmit = data => {
        console.log("Top ", data);
        // saveNextLocation("/filterResult", { state: { filterOptions: data } });
        // navigate("/filterResult", { state: { filterOptions: data } })
    };

    const classes = useStyles();
    const [checked, setChecked] = React.useState([]);
    const handleToggle = (value) => () => {
            const currentIndex = checked.indexOf(value);
            const newChecked = [...checked];
            if (currentIndex === -1) {
                newChecked.push(value);
            } else {
                newChecked.splice(currentIndex, 1);
            }
            setChecked(newChecked);
        };
    
    const resetFilters = () => () => {
        const newChecked = [];
        setChecked(newChecked);
    }

    const fn = [
        "subId"
        , "subStartVol"
        , "subSubscriptionType"
        , "subSlipNum"
        , "subName"
        , "subAbout"
        , "subAdd1"
        , "subAdd2"
        , "subPost"
        , "subCity"
        , "subState"
        , "subPincode"
        , "subPhone"
        , "subRemark"
        , "subDistId"
        , "subEndVol"
    ]

    var initFilterOptions = {
        subId: ["ASSS", "AAWW"]
        , subStartVol: []
        , subSubscriptionType: []
        , subSlipNum: []
        , subName: []
        , subAbout: []
        , subAdd1: []
        , subAdd2: []
        , subPost: []
        , subCity: []
        , subState: []
        , subPincode: []
        , subPhone: []
        , subRemark: []
        , subDistId: []
        , subEndVol: []
    }

    const [filterOptions, setFilterOptions] = useState(initFilterOptions);

    function CheckboxList() {
        const classes = useStylesList();
        
        return (
            <List className={classes.root}>
                {fn.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                        <>
                            <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.indexOf(value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={<Typography> {value}</Typography>} />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <Divider variant="inset" component="li" />
                            <Divider variant="inset" component="li" />
                        </>
                    );
                })}
            </List>
        );
    }

    function RenderOne(props) {
        const [expanded, setExpanded] = useState(false);
        const { reset } = useForm();
        const handleExpandClick = () => {
            setExpanded(!expanded);
        };
        const fieldName = props.fieldName;
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
                            <Grid item>
                                <Button size="small" color="primary"
                                    // className={classes.button}
                                    variant="outlined"
                                    onClick={() => {
                                        fields.length > 0 && remove([...Array(fields.length).keys()])
                                    }
                                        //   reset({
                                        //   [fieldName] : ["Jai Guru Maa"]
                                        //   })
                                    }
                                >
                                    Clear Filter
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button size="small" color="primary"
                                    // className={classes.button}
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
                                                type="text"
                                                fullWidth
                                                autoComplete={`${fieldName}`}
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
                                            defaultValue="" // make sure to set up defaultValue
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

    function RenderFilters() {
        return (
                <Grid
                    container
                    className={classes.color}
                    direction="column"
                    justify="flex-start"
                    alignItems="stretch"
                    spacing={1}

                >
                    {checked.map(fieldName => (
                        <Grid item key={fieldName}
                            className={classes.gridCard}
                        >
                            <RenderOne fieldName={fieldName} />
                        </Grid>
                    ))}
                </Grid>
        );

    }

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
                                            <CheckboxList />
                                        </Grid>

                                        {checked.length !== 0 &&
                                            <Grid item>
                                                <RenderHeading heading="Filter Details" />
                                                <RenderFilters />
                                            </Grid>
                                        }
                                        {checked.length !== 0 && <Fab
                                            size="large" color="secondary"
                                            className={classes.fab}
                                            type="submit">
                                            <SendIcon className={classes.extendedIcon} />
                                        </Fab>}
                                    </Grid>
                                </>
                            </CssBaseline>
                        </Grid>
                    </Grid>
                </Grid>
                {checked.length !== 0 && <Grid
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
                        onClick={resetFilters ()}
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