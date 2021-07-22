import dcopy from "deep-copy";


function makeDistributorHeadline(distributor, expiryYearDuration, expiryCount, expiryVol) {
    const d = distributor
    return (
        {
            unbreakable: true,
            lineHeight: 0.85,
            fontSize: 16,
            table: {
                widths: ['*', '*'],
                body: [
                    [
                        {
                            stack: [
                                d.distName,
                                d.distAdd,
                                d.distCity
                            ]
                        },
                        {
                            text: 'Expired - ' + expiryCount , fontSize: 20,
                            alignment: 'center'
                        }
                    ],
                    [ { text: 'Dist Id : ' + d.distId + '\t\t\t Mob: ' + (d.distPhone ? d.distPhone : 'Not Available'), fontSize: 12, bold: true }
                    , { text: 'Expiries For Last ' + expiryYearDuration + ' Years From Vol: ' + expiryVol,  alignment: 'center', fontSize: 13, bold: true}]

                ]
            }

        }
    )
}


function singleExpiry(subscriber) {
    const a = subscriber
    return (
        [ {text : a.subId, fontSize : 12}
        ,  { text : a.subscriptions[0].substartvol + '-' + a.subscriptions[0].subendvol, fontSize : 12}
        ,  {text : a.subName, fontSize : 12}
        , (a.subAbout === ("" || null) ? "" : a.subAbout + ', ')
         + (a.subAdd1 === ("" || null) ? "" : a.subAdd1 + ', ')
         + (a.subCity === ("" || null) ? "" : a.subCity)
        , (a.subAdd2 === ("" || null) ? "" : a.subAdd2)
        , (a.subPost === ("" || null) ? "" : a.subPost)
        ]
    )
}

const tableHeader = 
  [{ text: 'सदस्य क्रमांक' , fontSize : 13},
   { text: 'विवरण'      , fontSize : 13},
   { text: 'नाम'        , fontSize : 13},
   { text: 'पता'        , fontSize : 13},
   { text: 'मोहल्ला'      , fontSize : 13},
   { text: 'पोस्ट'        , fontSize : 13}
   ]

function makeExpiryList(expiries) {
    const th = dcopy(tableHeader);
    const expArr = [th];
    while (expiries.length > 0) {
        const e1 = expiries.shift();
        expArr.push(singleExpiry(e1))
    }
    return (
               { table: {
                   widths: [35,'auto',100,'*','auto',65],
				   headerRows: 1,
				   body: expArr
			    },
                fontSize : 11,
                margin: [1, 3, 0, 0], // sets gap between each row
                lineHeight: 0.75
		       });
    
}

			

export default function makeExpiryListData(distributorData, expiryDetails, susbcriberListData) {
    const arr = []
    const expiries = dcopy(susbcriberListData); // deep copy for safer operations ahead 
    const expiryCount = expiryDetails.expiryCount
    const expiryVol = expiryDetails.expiryVol
    const expiryYearDuration = expiryDetails.expiryYearDuration
    const distPdfData = makeDistributorHeadline(distributorData, expiryYearDuration, expiryCount, expiryVol)
    arr.push(distPdfData);
    (expiryCount > 0)  && arr.push(makeExpiryList(expiries, expiryCount));
    return arr;
}
