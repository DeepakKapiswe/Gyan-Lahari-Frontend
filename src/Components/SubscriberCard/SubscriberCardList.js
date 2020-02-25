import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        overflow: 'hidden',
        padding: theme.spacing(2, 4, 2, 4),
    },
    color: {
        // backgroundColor: '#f0f5ce',
        background: 'linear-gradient(to bottom, #ffff99 62%, #ccff99 100%)',
    },

    title: {
        backgroundColor: '#e1c2ed',
        padding: theme.spacing(2, 4, 2, 4),
        alignItems: 'center',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f2f2',
    },
    gridCard: {
        flexGrow: 1,
    }
}));

export default function SubscriberCardList(props) {
    const classes = useStyles();
    const cards = props.cards;

    return (
        <>
            <Paper className={classes.paper}
            >
                <Paper className={classes.title}>
                    <Typography variant="h4"
                        align="center"
                        noWrap="true">
                        All Subscribers
                </Typography>
                </Paper>
            </Paper>

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