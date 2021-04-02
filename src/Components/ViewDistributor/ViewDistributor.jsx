import React from 'react';
import ButtonRouter from '../../common/ButtonRouter';
import DistributorDetails from '../DistributorDetails/DistributorDetails';

export default function SearchResult (props) {
    if (props.location.state == null) { return (
       <>
        <h1> Oops... Something Went Wrong Please Click Add New Distributor !! </h1>
        <ButtonRouter route="/addNewDistributor" label="Add New Distributor" />
       </>
    ); }
    const distributor = props.location.state.distributor;
    return (
       <>
        <DistributorDetails distributor={distributor} />
        <ButtonRouter route="/addNewDistributor" label="Add New Distributor" />
       </>
    );
}