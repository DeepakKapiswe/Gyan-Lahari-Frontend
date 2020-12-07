import React from "react";
import Coverflow from 'react-coverflow';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "@material-ui/core";

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    img: {
        width: '600px',
        height: '540px',
        
        // backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/background1.png'})`,
        backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
    },
    root : {
        backgroundColor: '#efcc71',
    }
}));

const fn = function () {
    /* do your action */
}

export default function TestPhoto() {
    const styles = useStyles();
    return <Container
             maxWidth="lg"
             disableGutters
             className={styles.root}
            >

        <Coverflow
            width={900}
            height={540}
            displayQuantityOfSide={2}
            enableHeading={false}
            currentFigureScale={2}
            otherFigureScale={1}
            // infiniteScroll
            // active={3}
            // className={styles.img}
        >
            <div
                onClick={() => fn()}
                onKeyDown={() => fn()}
                role="menuitem"
                tabIndex="0"
            >
                <img
                    src={`${process.env.PUBLIC_URL + '/assets/wallpaper2you_519883.jpg'}`}
                    alt='title or description'
                    style={{
                        display: 'block',
                        width: '100%',
                    }}
                />
            </div>
            <img src={`${process.env.PUBLIC_URL + '/assets/gs1.png'}`}
                alt='title or description'
                style={{ display: 'block', width: '100%' }}
            />
            <img src={`${process.env.PUBLIC_URL + '/assets/gs2.png'}`}
                alt='title or description'
                style={{ display: 'block', width: '100%' }}
            />
            <img src={`${process.env.PUBLIC_URL + '/assets/gs3.png'}`}
                alt='title or description'
                style={{ display: 'block', width: '100%' }}
            />
            <img src={`${process.env.PUBLIC_URL + '/assets/darkbg.jpg'}`}
                alt='title or description'
                style={{ display: 'block', width: '100%' }}
            />
            <img src={`${process.env.PUBLIC_URL + '/assets/tmpbg.jpg'}`}
                alt='title or description'
                style={{ display: 'block', width: '100%' }}
            />
            <img src={`${process.env.PUBLIC_URL + '/assets/darkbg.jpg'}`}
                alt='title or description'
                style={{ display: 'block', width: '100%' }}
            />
        </Coverflow>
    </Container>

}