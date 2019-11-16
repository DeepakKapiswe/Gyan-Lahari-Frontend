import React from 'react';
import {navigate} from '@reach/router';
import ButtonBase from '@material-ui/core/ButtonBase';
import MyButton from './Button';

export default function ButtonRouter (props) {
    return (
        <ButtonBase onClick={() => navigate(props.route)}>
            <MyButton label={props.label}/>
        </ButtonBase> 
    );
}