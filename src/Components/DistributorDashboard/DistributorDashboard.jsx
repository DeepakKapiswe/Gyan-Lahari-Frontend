import React from 'react';

import { makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DistributorDetails from '../DistributorDetails/DistributorDetails';
import FetchDistributorDashboard from './FetchDistributorDashboard';
import { useAppState } from '../../Contexts/AppContext';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  heading: {
    color: '#aaaaaa',
    [breakpoints.down('md')]: {
      fontSize: '3rem',
    },
    [breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
}));

export default function DistributorDashboard (props) {
  const styles= useStyles();
  const {distributorDetails} = useAppState();

  if (distributorDetails === null) {return <FetchDistributorDashboard/>;}
  return (
    <>
      <Typography variant="h2" component="h3"
          className={styles.heading}>
            Distributor Dashboard
      </Typography>
      {distributorDetails ? <DistributorDetails distributor={distributorDetails} /> : <>Oops Rendering Issues</>}
    </> );
}
