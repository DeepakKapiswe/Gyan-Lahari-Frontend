import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';



const useStyles = makeStyles(theme => ({
  footer: {
      padding: theme.spacing(3, 2),
      marginTop: 'auto',
    //   backgroundColor:
    //       theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
  },
  }));

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © '}
            {/* <Link color="inherit" href="https://material-ui.com/"> */}
            <Link color="inherit" href="https://www.kabirgyan.com">
                Kabir Gyan
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Typography variant="body1">Sri Kabir Gyan Prakashan Kendra</Typography>
                <Copyright />
            </Container>
        </footer>
    );
}