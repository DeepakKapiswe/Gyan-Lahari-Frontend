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
    while (dataArr.length > 0) {
        const dl = dataArr.shift();
        const distributionDetails = {
            expiryCount  : dl.dlExpiryCount
          , runningCount : dl.dlRunningCount
          , currentVol   : dl.dlCurrentVol
          }
        const dlPdfData = makeDistributionListData(dl.dlDistributor, distributionDetails, dl.dlSubscriberList)
        arr.push(dlPdfData)
        arr.push(pageBreak)
        dataArr.slice()
    }
    rawPdfData.content = arr;
    console.log('pdf data')
    console.log(rawPdfData.content)
    return rawPdfData;
}