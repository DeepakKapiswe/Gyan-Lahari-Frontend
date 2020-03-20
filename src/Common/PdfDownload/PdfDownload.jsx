import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfSubscriberList from '../PdfSubscriberList/PdfSubscriberList';
import LinearProgress from "../../Components/Progress/LinearProgressBar";
import Grid from '@material-ui/core/Grid';



export default function PdfDownload(props) {
    const pdfData = props.location.state.data
    return (
        <Grid container
            direction="row"
            justify="center"
            alignItems="baseline"
        >
            <PDFDownloadLink
                document={<PdfSubscriberList data={pdfData} />}
                fileName="First.pdf"
                style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#4a4a4a",
                    backgroundColor: "#f2f2f2",
                    border: "1px solid #4a4a4a"
                }}
            >
                {({ blob, url, loading, error }) =>
                    loading ? <LinearProgress /> : "Click To Download"
                }
            </PDFDownloadLink>
        </Grid>
    );
}