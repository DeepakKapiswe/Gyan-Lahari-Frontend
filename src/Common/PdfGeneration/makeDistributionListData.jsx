import dcopy from "deep-copy";

function makeSubscriberCell(subscriber, currentVol) {
    const a = subscriber
    a.isExpiring = a.subEndVol === currentVol
    return (
        {
            margin: [8, 9, 0, 0], // sets gap between each row
            lineHeight: 0.85,
            decorationStyle: 'dashed',

            table: {
                body: [[
                    {
                        border: [false, false, false, false],
                        stack: [{
                            text:
                                'SC:' + a.subId +
                                ' D' + a.subDistId +
                                ' V' + currentVol + '{' + a.subStartVol + '-' + a.subEndVol + '}' +
                                (a.isExpiring ? '**' : ''),
                            background: (a.isExpiring ? '#98997f' : '')
                        }
                            , a.subName
                            , (a.subAbout === ("" || null) ? "" : a.subAbout)
                            , (a.subAdd1 === ("" || null) ? "" : a.subAdd1)
                            , (a.subAdd2 === ("" || null) ? "" : a.subAdd2)
                            , (a.subPost === ("" || null) ? "" : a.subPost)
                            , (a.subCity === ("" || null) ? "" : a.subCity)
                            , (a.subState === ("" || null) ? "" : a.subState)

                            , (a.subPincode === ("" || null) ? "" : a.subPincode)
                            , (a.subPhone === ("" || null) ? "" : 'Mob: ' + a.subPhone)
                        ]
                    }
                ]]
            }
        }
    )

}

function makeDistributorHeadline(distributor, count, expiryCount, currentVol) {
    const d = distributor
    return (
        {
            unbreakable: true,
            margin: [8, 9, 0, 0], // sets gap between each row
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
                            text: count + ' - प्रति', fontSize: 45,
                            alignment: 'center'
                        }
                    ],
                    [{ text: 'Dist Id : ' + d.distId + '\t\t\t Mob: ' + (d.distPhone ? d.distPhone : 'Not Available') + '\tVol: ' + currentVol, fontSize: 12, bold: true }
                        , { text: 'Expiries After This Vol: ' + expiryCount,  alignment: 'center',  bold: true}]

                ]
            }

        }
    )
}


function singleExpiry(subscriber) {
    const a = subscriber
    return (
        [ {text : a.subId, fontSize : 12}
        ,  { text : a.subStartVol + '-' + a.subEndVol, fontSize : 12}
        ,  {text : a.subName, fontSize : 12}
        , (a.subAbout === ("" || null) ? "" : a.subAbout + ', ')
         + (a.subAdd1 === ("" || null) ? "" : a.subAdd1 + ', ')
         + (a.subAdd2 === ("" || null) ? "" : a.subAdd2)
        , (a.subPost === ("" || null) ? "" : a.subPost)
        , (a.subCity === ("" || null) ? "" : a.subCity)
        , ''
        ]
    )
}

const expiryHeadline = { text : '\nइस अंक के पश्चात निम्नांकित सदस्यों की सदस्यता समाप्त हो जाएगी ! \nकृपया नवीणीकरण करवा लें !\n',
                     alignment : 'center',
                     bold : 'true',
                     fontSize : 18,
                     unbreakable: true
                     }
const expiryHeadline2 = { text : '*************************\n',
                     alignment : 'center',
                     fontSize : 10,
                     unbreakable: true
                     }

const tableHeader = 
  [{ text: 'सदस्यता-क्रमांक' , fontSize : 13},
   { text: 'विवरण'       , fontSize : 13},
   { text: 'नाम'         , fontSize : 13 },
   { text: 'पता'         , fontSize : 13},
   { text: 'पोस्ट'        , fontSize : 13},
   { text: 'नगर'         , fontSize : 13},
   { text: '√', fontSize : 18, bold : true}
   ]

function makeExpiryList(expiries) {
    const expArr = [];
    expArr.push(tableHeader)
    while (expiries.length > 0) {
        const e1 = expiries.shift();
        expArr.push(singleExpiry(e1))
    }
    return [
               expiryHeadline,
               expiryHeadline2,
               { table: {
                   widths: [40,'auto','auto','*','auto','auto', 20],
				headerRows: 1,
				body: expArr
			    },
                fontSize : 11,
		       }
    ]
}

			


export default function makeDistributionListData(distributorData, distributionDetails, susbcriberListData) {
    const arr = []
    const dataArr = dcopy(susbcriberListData); // deep copy for safer operations ahead 
    const totalSubscriber = distributionDetails.runningCount
    const expiryCount = distributionDetails.expiryCount
    const currentVol = distributionDetails.currentVol
    const expiries = dcopy(distributionDetails.expiries)
    const distPdfData = makeDistributorHeadline(distributorData, totalSubscriber, expiryCount, currentVol)
    arr.push(distPdfData)
    while (dataArr.length > 0) { // remove first three elements of Data Array
        const a1 = dataArr.shift();
        const a2 = dataArr.shift();
        const a3 = dataArr.shift();
        arr.push(
            {
                unbreakable: true,
                columns: [
                    makeSubscriberCell(a1, currentVol),
                    a2 && makeSubscriberCell(a2, currentVol),
                    a3 && makeSubscriberCell(a3, currentVol),
                ]
            })
        dataArr.slice(3);
    }
    (expiryCount > 0  && arr.push(makeExpiryList(expiries)))

    return arr;
}
