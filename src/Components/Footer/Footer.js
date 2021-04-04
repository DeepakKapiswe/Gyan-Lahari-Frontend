import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';



const useStyles = makeStyles(theme => ({
  footer: {
      padding: theme.spacing(3, 2),
      marginTop: 'auto',
      backgroundColor:'#2a2521'
    //       theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
  },
  text : {
      color : '#f3f7d7'
  },
  link : {
      color : '#e5ff40'
  },
  }));

function Copyright() {
    const classes = useStyles();
    return (
        <div className={classes.text}>
        <Typography variant="body2">
          {'Copyright © '}
            <Link className={classes.link} href="https://kabirgyan.com">
                Gyan Lahari
            </Link>
          {' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
        <Typography variant="body2" >
                {'Contact us '}
                {'+91-9155950505'}
            </Typography>
       </div>
    );
}


export default function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm" className={classes.text}>
                <Typography variant="body1">Sri Kabir Gyan Prakashan Kendra</Typography>
                <Copyright className={classes.text} />
            </Container>
        </footer>
    );
}