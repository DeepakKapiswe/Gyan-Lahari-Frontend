import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        overflow: 'hidden',
        padding: theme.spacing(2, 4, 2, 4),
    },
    gridList: {
        justifyContent: 'space-around',
        maxHeight: 640,
        alignItems: 'baseline',
        backgroundColor: '#f0f5ce',
        padding: theme.spacing(2, 4, 2, 4),
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
        height: '80vh',
    },
}));

export default function SubscriberCardList(props) {
    const classes = useStyles();
    const cards = props.cards;

    return (
        <Paper className={classes.paper}>
            <Paper className={classes.title}>
                <Typography variant="h4"
                    align="center"
                    noWrap="true">
                    All Subscribers
                </Typography>
            </Paper>
            <Container className={classes.root}>
                <GridList cellHeight="auto" className={classes.gridList}>
                    {cards.map(card => (
                        card
                    ))}
                </GridList>
            </Container>
        </Paper>
    );
}