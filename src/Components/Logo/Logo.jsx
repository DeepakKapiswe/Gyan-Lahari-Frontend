import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../../assets/img/LOGO_NEW 2020.png';


const useStyles = makeStyles((theme) => ({
    center: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
      [theme.breakpoints.up('sm')]: {
        maxWidth: '7%',
      },
      [theme.breakpoints.down('sm')]: {
        maxWidth: '15%',
      },
    //   opacity: '0.2',
    //   zIndex: "revert"
    },
    bigger : {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
      maxWidth:'25%'
    }}
));


export default function Logo (props) {
    const classes = useStyles();
    return (
        // <img src={logo} alt="" className={classes.center + ' ' + props.customClass} />
        <img src={logo} alt="" className={props.medium ? classes.bigger :classes.center } />
    )

}