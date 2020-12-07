import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import  './Slider.css';

const useStyles = makeStyles(({ breakpoints, spacing, shadows }) => ({
    root : {
        maxWidth: '100%',
        height: 'auto',
        backgroundColor: '#efcc71',
        paddingBottom: '50px',
        boxShadow: shadows[9],
    }
}));


function Slider () {
  const styles = useStyles();
  return <div className='slider-contain'>

  <div className={styles.root} >
    <Container sm>
    <AwesomeSlider
      organicArrows={false}
    >
      <div className={styles.img} data-src={`${process.env.PUBLIC_URL + '/assets/gs1.png'}`} />
      <div className={styles.img} data-src={`${process.env.PUBLIC_URL + '/assets/gs2.png'}`} />
      <div className={styles.img} data-src={`${process.env.PUBLIC_URL + '/assets/gs3.png'}`} />
    </AwesomeSlider>
    </Container>
    </div>
  </div>
}

export default function MYSlider () {
  return <div className='slider-contain'>
    <Slider/>
  </div>
}