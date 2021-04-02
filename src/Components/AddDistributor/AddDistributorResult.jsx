import React, { Suspense } from 'react';

import BackButton from '../BackButton/BackButton';
import { LinearProgress } from '@material-ui/core';
import ButtonRouter from '../../Common/ButtonRouter';
import AddDistributor from './AddDistributor';

export default function AddDistributorResult (props) {
    if (props.location.state == null) { return (
        <>
        <h1> Oops... You Visited Wrong Place Please Click Add New Distributor!! </h1>
        <BackButton label="Add New Distributor" path="/patrika/addNewDistributor"/>
       </>
    ); }
    const newDistributorData = props.location.state.newDistributorData;
    return (
       <>
        <Suspense fallback={<LinearProgress/>}>
        <AddDistributor newDistributorData={newDistributorData}/>
        </Suspense>
        <ButtonRouter route="/patrika/addNewDistributor" label="Add More" />
       </>
    );
}