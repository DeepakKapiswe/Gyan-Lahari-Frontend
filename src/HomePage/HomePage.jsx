import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CssBaseline, Grid } from '@material-ui/core';
import Header from './Components/Header';
import TestPhoto from './Components/TestPhoto';
import Test2 from './Components/TEST2';
import ImageCard from './Components/ImageCard';
import ImageHoverZoom from './Components/ImageHoverZoom';
import useWindowPosition from './Hooks/AnimationHook';
import Animated from './Common/Animation';
import { Background, Parallax } from 'react-parallax';


const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    heading: {
        // color: '#aaaaaa',
        [breakpoints.down('md')]: {
            fontSize: '3rem',
        },
        [breakpoints.down('sm')]: {
            fontSize: '2rem',
        },
    },
    root: {
        padding: 200,
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${process.env.PUBLIC_URL + '/assets/baner2.jpg'})`,
        // backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/pic1.png'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        background: '#fbe6c4',
        margin: 'auto',
        objectFit: 'contain',
        // color: 'rgba(255,255,255,0)',
        // minHeight: '480px',
        // maxHeight: '800px',
        backgroundPosition: '70% top',
        // position: 'relative',
    },
    heroText: {
        textAlign: 'center',
        position: 'absolute',
        top: '80%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '4rem',
        fontFamily: 'Domine, serif',
        fontWeight: '700',
    },
    root2: {
        minHeight: '100vh',
        // backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/wallpaper2you_519883.jpg'})`,
        // backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/tmpcov.png'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    cards: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '1200px',
        height: 'auto',
        margin: 'auto',

        // minHeight: '100vh',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    center: {
        // height: 'auto',
        // minHeight: '100vh',
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading1: {
        textAlign: 'center',
        // top: '80%',
        // left: '50%',
        // transform: 'translate(-50%, -50%)',
        color: '#050355',
        fontSize: '4rem',
        fontFamily: 'Domine, serif',
        fontWeight: '700',
        padding: 10,
    },
    bar1: {
        // margin : 50,
        padding: 100,
        background: '#dac693',

    },
    guruMaaImage: {
        // maxHeight : '60vh',
        // height: '300px',
        // maxWidth: '800px',
        // maxWidth: '500px',
        // height: 'auto',
        border: '10px',

    },

}));

const inlineStyle = {
    background: '#fff',
    left: '50%',
    top: '50%',
    position: 'absolute',
    padding: '20px',
    transform: 'translate(-50%, -50%)',
}

const bgStyle = {
    minHeight: '50vh',
    // backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/wallpaper2you_519883.jpg'})`,
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/tmpcov.png'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',

}

export default function HomePage(props) {
    const styles = useStyles();
    const image2 = `${process.env.PUBLIC_URL + '/assets/tmpcov.png'}`
    const image1 = "https://images.unsplash.com/photo-1498092651296-641e88c3b057?auto=format&fit=crop&w=1778&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D";
    ;
    const handleClick = () => {
    };
    return (
        <>
            <CssBaseline />
            <Header />
            <div className={styles.root}>
                <Typography variant="h2" component="h3" align="center"
                    className={styles.heroText} id="someId">
                    Hero Image Will Be Here
                </Typography>
            </div>
            <Grid container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={1}
                className={styles.bar1}
            >

                <Grid item >
                    <div className={styles.guruMaaImage}>

                        <ImageHoverZoom imagePath="flower2.jpg" />
                    </div>
                </Grid>
                <Grid item>

                    <Typography variant="h2" component="h3" align="center"
                        className={styles.heading1} id="someId">
                        सद्गुरू माँ
                    </Typography>
                    <Typography variant="h2" component="h3" align="center"
                        className={styles.heading1} id="someId">
                        एक दिव्य विभूति
                    </Typography>
                </Grid>

            </Grid>
            <TestPhoto />
            <div id="12" ></div>
            <div className={styles.center} id="76" >
                <Animated animationStartId="12" timeout={2000} >
                    <Test2 id="slider2" />
                </Animated>
            </div>
            <Parallax
                bgImage={image2}
                bgImageAlt="Jai Guru Maa"
                strength={200}
                bgImageStyle={bgStyle}
            >
                <div style={{ height: 364 }}>
                </div>

            </Parallax>
            <Animated animationStartId="76" timeout={2000} >
                <h1>He Prabhu Bas Aapki Hi Kripa Hai</h1>
            </Animated>
            <div className={styles.root2}>
                <div className={styles.cards} id="23">
                    <ImageCard imgSrc="gs1.png" />
                </div>
                <div className={styles.cards} id="767">
                    <Cards id="767" />
                    {/* <ImageHoverZoom imagePath="gs2.png" />
                    <ImageHoverZoom imagePath="gs1.png" />
                    <ImageHoverZoom imagePath="gs3.png" /> */}
                </div>
            </div>
        </>);
}

function Cards({ id }) {
    const checked = useWindowPosition(id);
    return <>
        <ImageHoverZoom imagePath="gs2.png" checked={checked} timeout={3000} />
        <ImageHoverZoom imagePath="gs1.png" checked={checked} timeout={2000} />
        <ImageHoverZoom imagePath="gs3.png" checked={checked} timeout={1000} />
    </>
}