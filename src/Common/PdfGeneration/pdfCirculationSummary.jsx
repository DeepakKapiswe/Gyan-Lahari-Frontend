import makeCirculationSummaryData from "./makeCirculationSummaryData";
import pdfConfig from "./pdfConfig";

export default function makePdfCirculationSummaryData(circulationSummaryData, circulationMetaData) {
    const rawPdfData = pdfConfig()
    rawPdfData.content = makeCirculationSummaryData(circulationSummaryData, circulationMetaData)
    return ( rawPdfData );
}