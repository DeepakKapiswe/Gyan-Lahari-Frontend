import { Collapse, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(({ breakpoints, spacing, shadows }) => ({
    imgWrapper: {
        // maxWidth: 1200,
        // height: 'auto',
        overflow: 'hidden',
        '&:hover': {
            boxShadow: shadows[19],
        }
    },
    hoverZoom: {
        transition: 'all 0.3s ease 0s',
        // width: '100%',
        '&:hover': {
            transform: 'scale(1.03)',
        }
    },
}));


const ImageHoverZoom = ({ imagePath, checked, timeout }) => {
    const classes = useStyles();
    return (

        <div className={classes.imgWrapper}>
            <img src={`${process.env.PUBLIC_URL + '/assets/' + imagePath}`}
                alt=""
                className={classes.hoverZoom} />
        </div>
    );
};
export default ImageHoverZoom;
// const ImageHoverZoom = ({ imagePath, checked, timeout }) => {
//     const classes = useStyles();
//     return (
//        <Collapse
//         in={checked}
//         {...(checked ? { timeout: timeout } : {})}
//       >

//         <div className={classes.imgWrapper}>
//             <img src={`${process.env.PUBLIC_URL + '/assets/' + imagePath}`}
//                 alt=""
//                 className={classes.hoverZoom} />
//         </div>
//       </Collapse>
//     );
// };