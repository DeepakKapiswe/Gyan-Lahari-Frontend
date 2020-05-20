import React from 'react';
import { Link } from "@reach/router";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  text : {
      color : '#050505'
  },
  link : {
      color : '#e4ded4'
  },
  }));

export default function ButtonLink(props) {
    const classes = useStyles();
    return (
        <Link to={props.to} className={classes.link} >
            <Button className={classes.text} >
                <h3>{props.label}</h3>
            </Button>
                 </Link>
    );
}