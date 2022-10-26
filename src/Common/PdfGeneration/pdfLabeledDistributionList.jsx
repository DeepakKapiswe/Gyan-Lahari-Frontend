import makeLabeledDistributionListData from "./makeLabeledDistributionListData";
import pdfLabelConfig from "./pdfLabelConfig";

export default function makePdfLabeledDistributionListData(distributionDetails, susbcriberListData) {
    const rawPdfData = pdfLabelConfig();
    rawPdfData.content = makeLabeledDistributionListData(distributionDetails, susbcriberListData)
    return ( rawPdfData );
}
