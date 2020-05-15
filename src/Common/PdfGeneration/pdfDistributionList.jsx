import makeDistributionListData from "./makeDistributionListData";
import pdfConfig from "./pdfConfig";

export default function makePdfDistributionListData(distributorData, distributionDetails, susbcriberListData) {
    const rawPdfData = pdfConfig()
    rawPdfData.content = makeDistributionListData(distributorData, distributionDetails, susbcriberListData)
    return ( rawPdfData );
}
