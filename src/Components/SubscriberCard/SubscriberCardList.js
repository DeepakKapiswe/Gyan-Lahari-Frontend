import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
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
    },
    color: {
        backgroundColor: '#ebf5ab',
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
        background: 'linear-gradient(to right, #190A05, #870000)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    },
    gridCard: {
        flexGrow: 1,
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
    return (
        <>
            <Grid className={classes.paper}>
                <Paper className={classes.title}>
                    <Typography variant="h4"
                        align="center"
                        noWrap="true">
                        {header}
                    </Typography>
                    <FlowerDiv />

                    <ButtonGroup orientation="vertical"
                        variant="contained">

                        <BrowserView>
                            <Button size="small" color="primary"
                                className={useStyles.button}
                                variant="contained"
                                onClick={e => navigate("/viewPdf", { state: { data: pdfData } })}
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
                            ß onClick={e => navigate("/downloadPdf", { state: { data: pdfData, fileName: pdfName } })}
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
                </Paper>
            </Grid>

            <Grid
                container
                className={classes.color}
                alignItems="flex-start"
                alignContent="flex-start"
                justifyContent="center"
            >
                {cards.map(card => (
                    <Grid item
                        md={6} lg={4}
                        className={classes.gridCard}
                    >
                        {card}
                    </Grid>
                ))}
            </Grid>
        </>
    );
}