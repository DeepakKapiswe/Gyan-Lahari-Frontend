import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FlowerDiv from '../FlowerDiv/FlowerDiv';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        overflow: 'hidden',
        padding: theme.spacing(2, 4, 2, 4),
    },
    color: {
    backgroundColor: '#ebf5ab',
    height: '68vh',
    overflow: 'scroll',
    border: '5px solid #B6DBCB',
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
    backgroundColor: '#ebf5ab',
},
gridCard: {
        flexGrow: 1,
    }
}));

export default function DistributorCardList(props) {
    const classes = useStyles();
    const cards = props.cards;

    return (
        <>
            <Grid className={classes.paper}>
                <Paper className={classes.title}>
                    <Typography variant="h4"
                        align="center"
                        noWrap="true">
                        All Distributors
                    </Typography>
                    <FlowerDiv black={true} />
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