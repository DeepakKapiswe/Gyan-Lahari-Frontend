import React from 'react';
import { Link } from "@reach/router";


export default function ButtonLink(props) {
    return (
        <Link to={props.to} > <h3>{props.label}</h3></Link>
    );
}