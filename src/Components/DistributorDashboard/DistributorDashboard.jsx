import React from 'react';

import DistributorDetails from '../DistributorDetails/DistributorDetails';
import FetchDistributorDashboard from './FetchDistributorDashboard';
import { useAppState } from '../../Contexts/AppContext';

export default function DistributorDashboard (props) {
  const {distributorDetails} = useAppState();

  if (distributorDetails === null) {return <FetchDistributorDashboard/>;}
  return (
    <>
      {distributorDetails ? <DistributorDetails distributor={distributorDetails} /> : <>Oops Rendering Issues</>}
    </> );
}
