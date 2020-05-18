import makeExpiryListData from "./makeExpiryListData";
import dcopy from "deep-copy";
import pdfConfig from "./pdfConfig";


export default function makePdfBulkExpiryListData(bulkExpiryListData) {
    const rawPdfData = pdfConfig()
    const arr = []
    const allExpiryLists = bulkExpiryListData // .ExpiryLists;
    const pageBreak = { text : '**************  ><><><><><><  **************'
                      , alignment: 'center'
                      , fontSize: 14
                      , pageBreak:'after' }

    const dataArr = dcopy(allExpiryLists); // deep copy for safer operations ahead 
    while (dataArr.length > 0) {
        const el = dataArr.shift();
        const expiryDetails = {
            expiryCount        : el.elExpiryCount
          , expiryVol          : el.elExpiryVol
          , expiryYearDuration : el.elExpiryYearDuration
          }
        const elPdfData = makeExpiryListData(el.elDistributor, expiryDetails, el.elExpiries)
        arr.push(elPdfData)
        arr.push(pageBreak)
        dataArr.slice()
    }
    rawPdfData.content = arr;
    console.log('pdf data')
    console.log(arr)
    return rawPdfData;
}