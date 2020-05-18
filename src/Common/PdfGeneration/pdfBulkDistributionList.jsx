import makeDistributionListData from "./makeDistributionListData";
import dcopy from "deep-copy";
import pdfConfig from "./pdfConfig";


export default function makePdfBulkDistributionListData(bulkDistributionListData) {
    const rawPdfData = pdfConfig()
    const arr = []
    const allDistributionLists = bulkDistributionListData // .distributionLists;
    const pageBreak = { text : '**************  ><><><><><><  **************'
                       , alignment: 'center'
                       , fontSize: 14
                       , pageBreak:'after' }

    const dataArr = dcopy(allDistributionLists); // deep copy for safer operations ahead 
    const pb = dcopy(pageBreak);
    while (dataArr.length > 0) {
        const dl = dataArr.shift();
        const distributionDetails = {
            expiryCount  : dl.dlExpiryCount
          , runningCount : dl.dlRunningCount
          , currentVol   : dl.dlCurrentVol
          , expiries     : dl.dlExpiries
          }
        const dlPdfData = makeDistributionListData(dl.dlDistributor, distributionDetails, dl.dlSubscriberList)
        arr.push(dlPdfData)
        arr.push(pb)
        dataArr.slice()
    }
    rawPdfData.content = arr;
    return rawPdfData;
}