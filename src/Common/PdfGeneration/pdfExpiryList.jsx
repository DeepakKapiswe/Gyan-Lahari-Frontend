import makeExpiryListData from "./makeExpiryListData";
import pdfConfig from "./pdfConfig";

export default function makePdfExpiryListData(distributorData, expiryDetails, susbcriberListData) {
    const rawPdfData = pdfConfig()
    rawPdfData.content = makeExpiryListData(distributorData, expiryDetails, susbcriberListData)
    return ( rawPdfData );
}
