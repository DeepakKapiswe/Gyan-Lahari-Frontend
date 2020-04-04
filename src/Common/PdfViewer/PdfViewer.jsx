import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import PdfSubscriberList from '../PdfSubscriberList/PdfSubscriberList';
import Grid from '@material-ui/core/Grid';
import BackButton from '../../Components/BackButton/BackButton';

export default function PdfView(props) {
    const pdfData = props.location.state.data
    return (
        <Grid container justify="center" >

            <PDFViewer width={900} height={842}>
                <PdfSubscriberList data={pdfData} />
            </PDFViewer>
            <BackButton />
        </Grid>
    );
}