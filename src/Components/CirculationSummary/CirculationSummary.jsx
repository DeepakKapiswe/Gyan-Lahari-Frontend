import React from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import dcopy from "deep-copy";
import { ButtonGroup } from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Grid from '@material-ui/core/Grid';
import { navigate } from '@reach/router';
import { BrowserView } from "react-device-detect";
import Button from '@material-ui/core/Button';

import { url_getCirculationSummary } from '../../apiEndpoints/api';
import LoginPrompt from '../LoginPrompt/LoginPrompt';
import { Checkbox, Container, Typography } from '@material-ui/core';

export default function CirculationSummary(props) {
  const url = url_getCirculationSummary ;
  // const url = userType === 'UDistributor' ? url_distRecentlyAddedSubscribers : url_recentlyAddedSubscribers ;
  const fetcher = (...args) => fetch(url, {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      'Accept':  'application/json',
      'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN') || "ERROR : XSRF TOKEN NOT FOUND",
    },
    credentials: 'include',
    body: JSON.stringify(props.payload)
  }).then(res => res.ok ? res.json() : res.status);

  const { data, error} = useSWR(url, fetcher, { suspense: true,revalidateOnFocus: false });
  if (props.payload.csVol === '') { return null; }
  if (error) return <div>Failed to Load in Circulation Summary</div>
  if (!data) return <div>loading...</div>
  if (data === 401) return <LoginPrompt/>
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const totalCirculations = data.csData.map(v =>v.circulationdetails.currcirculation).reduce(reducer);
  const totalExpiries = data.csData.map(v =>v.circulationdetails.currexpirycount).reduce(reducer);
  const issueNum = props.payload;
  const csDataRaw = dcopy(data);
  const pdfData ={circulationSummaryData: csDataRaw.csData, 
                  circulationMetaData:{ totalExpiries: totalExpiries, 
                                        totalCirculations: totalCirculations,
                                        circulationVolume: issueNum }, 
                  meta : 'CirculationSummary'} 
  const pdfName = `Circulation_Summary_Vol_${props.payload}`;

  const pdfButtons =(
    <ButtonGroup orientation="horizontal"
                variant="contained">

                <BrowserView>
                    <Button size="small" color="primary"
                        className={useStyles.button}
                        variant="contained"
                        onClick={e => navigate("/patrika/viewPdf", { state: { data: pdfData } })}
                    >
                        <Grid container direction="row" alignItems="center" 
                            spacing={1} >

                            <Grid item>


                                <h3>View</h3>
                            </Grid>
                            <Grid item>
                                <PictureAsPdfIcon fontSize="large" />
                            </Grid>

                        </Grid>
                    </Button>
                </BrowserView>
                <Button size="small" color="secondary"
                    variant="contained"
                    onClick={e => navigate("/patrika/downloadPdf", { state: { data: pdfData, fileName: pdfName } })}
                >
                    <Grid container direction="row" 
                      alignItems="center"
                      spacing={1} >
                        <Grid item>

                            <h3>Download</h3>
                        </Grid>
                        <Grid item>
                            <PictureAsPdfIcon fontSize="large" />
                        </Grid>
                    </Grid>
                </Button>
            </ButtonGroup>
    
);

  return (
    <>
    <Typography variant="h4" align="center">
      Current Circulation Summary <br/>
      <span>
        Volume : {props.payload} {'  '} 
      </span>
      <span>
          {'  |'} Circulations : {totalCirculations} 
      </span>
      <span>
          {'  |'} Expiries : {totalExpiries}
      </span>
    </Typography>

    <Container maxWidth="sm" align="center">
      {pdfButtons}
    </Container>
    <Container>

      <StickyHeadTable rows={data.csData} />
    </Container>
    </>
  );
}

// csData.[circulationdetails]
// distid: "1"
// distname: "डाक"
// distadd: null
// distcity: "डाक द्वारा"
// distphone: null
// currcirculation: 930
// currexpirycount: 45



const columns = [
  { id: 'distid', label: 'Id', minWidth: 10 },
  { id: 'distname', label: 'Name', minWidth: 70, align: 'left' },
  {
    id: 'distadd',
    label: 'Address',
    minWidth: 30,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'distcity',
    label: 'City',
    minWidth: 20,
    align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'distphone',
    label: 'Phone',
    minWidth: 20,
    align: 'right',
    // format: (value) => value.toFixed(10),
  },
  {
    id: 'currcirculation',
    label: 'Circulation',
    minWidth: 20,
    align: 'right',
    // format: (value) => value.toFixed(10),
  },
  {
    id: 'currexpirycount',
    label: 'Expiries',
    minWidth: 20,
    align: 'right',
    // format: (value) => value.toFixed(10),
  },
];


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export  function StickyHeadTable({rows}) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
              <TableCell padding="checkbox" style={{backgroundColor:'#f3e3ec' }}>
                <Checkbox />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontsize: 50, fontWeight: 700, backgroundColor:'#f3e3ec' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((r) => {
              const row = r.circulationdetails;
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.distid}>
                  <TableCell padding="checkbox">
                    <Checkbox/>
                  </TableCell>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}
                       style={{fontsize: '1.5rem', fontWeight: '700',letterSpacing: 0.5,}}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100, 200]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


