import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import flowerDiv from '../../assets/img/flower-divider-horizontal-orange.svg';
import flowerDivBlack from '../../assets/img/divider-blue-flower.svg';


const useStyles = makeStyles(() => ({
    center: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80%'
    }}
));


export default function FlowerDiv (props) {
    const classes = useStyles();
    return (
        props.black ? <img src={flowerDivBlack} alt="" className={classes.center} />
                    : <img src={flowerDiv} alt="" className={classes.center} />
    )

}