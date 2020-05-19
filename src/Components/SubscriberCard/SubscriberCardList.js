import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { navigate } from '@reach/router';
import dcopy from "deep-copy";
import { BrowserView }from "react-device-detect";


const useStyles = makeStyles(({ breakpoints, spacing, shadows }) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        overflow: 'hidden',
        padding: spacing(2, 4, 2, 4),
    },
    color: {
        // backgroundColor: '#f0f5ce',
        // background: 'linear-gradient(to bottom, #ffff99 62%, #ccff99 100%)',
        //     background: '#870000',   /* fallback for old browsers */
        // background: '-webkit-linear-gradient(to right, #190A05, #870000)',  /* Chrome 10-25, Safari 5.1-6 */
        // background: 'linear-gradient(to right, #190A05, #870000)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        background: 'linear-gradient(to bottom,  rgba(255,197,120,1) 6%,rgba(255,197,120,1) 17%,rgba(255,197,120,1) 29%,rgba(255,197,120,1) 29%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 32%,rgba(255,197,120,1) 49%,rgba(255,197,120,1) 60%,rgba(255,197,120,1) 60%,rgba(251,157,35,1) 97%,rgba(251,157,35,1) 98%,rgba(251,157,35,1) 98%,rgba(251,157,35,1) 100%,rgba(251,157,35,1) 101%)',
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
        // background: '#870000',   /* fallback for old browsers */
        // background: '-webkit-linear-gradient(to right, #190A05, #870000)',  /* Chrome 10-25, Safari 5.1-6 */
        background: 'linear-gradient(to right, #190A05, #870000)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    },
    gridCard: {
        flexGrow: 1,
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
                    <BrowserView>
                        <Button size="small" color="primary"
                            className={useStyles.button}
                            onClick={e => navigate("/viewPdf", { state: { data: pdfData } })}
                            > View PDF
                        </Button>
                    </BrowserView>
                    <Button size="small" color="primary"
                            className={useStyles.button}
                            onClick={e => navigate("/downloadPdf", { state: { data: pdfData, fileName:pdfName } })}
                            > Download PDF
                        </Button>
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