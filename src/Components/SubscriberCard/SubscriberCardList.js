import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { navigate } from '@reach/router';
import dcopy from "deep-copy";
import { BrowserView } from "react-device-detect";
import FlowerDiv from '../FlowerDiv/FlowerDiv';
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import { ButtonGroup } from '@material-ui/core';


const useStyles = makeStyles(({ breakpoints, spacing, shadows }) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        overflow: 'hidden',
        padding: spacing(2, 4, 2, 4),
        background: '#ebf5ab',

    },
    color: {
        height: '65vh',
        overflow: 'scroll',
        border: '5px solid #B6DBCB',
        boxShadow: shadows[9],
    },

    title: {
        backgroundColor: '#e1c2ed',
        padding: spacing(2, 4, 2, 4),
        alignItems: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ebf5ab',
    },
    gridCard: {
        flexGrow: 1,
    },
    heading: {
        color: '#110F4C',
        [breakpoints.up('sm')]: {
            fontSize: '3rem',
        },
        [breakpoints.down('sm')]: {
            fontSize: '2rem',
        },
    },
    button: {
        backgroundColor: '#fc3903',
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
}));




export default function SubscriberCardList(props) {
    const classes = useStyles();
    const cards = props.cards;
    const header = props.header;
    const pdfData = dcopy(props.pdfData);
    const pdfName = props.pdfName;


    const renderHeading = (
        <>
            <Grid item alignItems="center" >
                <Typography variant="h2" component="h3"
                    className={classes.heading} align="center">
                    {header}
                </Typography>
                <FlowerDiv />
            </Grid>
        </>
    );

    const pdfButtons =(
        <ButtonGroup orientation="vertical"
                    variant="contained">

                    <BrowserView>
                        <Button size="small" color="primary"
                            className={useStyles.button}
                            variant="contained"
                            onClick={e => navigate("/patrika/viewPdf", { state: { data: pdfData } })}
                        >
                            <Grid container direction="row" alignItems="center"  >
                                <Grid item>
                                    <VisibilityIcon fontSize="large" />
                                </Grid>

                                <Grid item>


                                    <h3>Click here to View PDF File</h3>
                                </Grid>
                                <Grid item>
                                    <PictureAsPdfIcon fontSize="large" />
                                </Grid>

                            </Grid>
                        </Button>
                    </BrowserView>
                    <Button size="small" color="secondary"
                        variant="contained"
                        onClick={e => navigate("/patrika/downloadPdf", { state: { data: pdfData, fileName: pdfName } })}
                    >
                        <Grid container direction="row" alignItems="center">
                            <Grid item>
                                <GetAppIcon fontSize="large" />
                            </Grid>
                            <Grid item>

                                <h3>Click here to Download PDF</h3>
                            </Grid>
                            <Grid item>
                                <PictureAsPdfIcon fontSize="large" />
                            </Grid>
                        </Grid>
                    </Button>
                </ButtonGroup>
        
    );

    return (
        <>
            <Grid className={classes.paper}>
                {renderHeading}
                {props.noPdf !== true && pdfButtons}
            </Grid>

            <Grid
                container
                className={classes.color}
                alignItems="flex-start"
                alignContent="flex-start"
                justifyContent="center"
            >
                {cards.length === 0 ? 
                        <Typography variant="h2" component="h3"
                            className={classes.heading} align="center">
                            No Records Found!
                        </Typography> : 
                  cards.map(card => (
                    <Grid item
                        md={6} lg={props.isLargeItem === undefined ? 4 : 6 } xl={3} 
                        className={classes.gridCard}
                    >
                        {card}
                    </Grid>
                ))}
            </Grid>
        </>
    );
}