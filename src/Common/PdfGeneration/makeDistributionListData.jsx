import dcopy from "deep-copy";
import makeExpiryData from "./makeExpiryData";

function makeSubscriberCell(subscriber, currentVol) {
    const a = subscriber
    a.subStartVol = a.currPlan ? a.currPlan.substartvol : a.subscriptions[0].substartvol
    a.subEndVol = a.currPlan ? a.currPlan.subendvol : a.subscriptions[0].subendvol
    a.isExpiring = a.subEndVol === currentVol && a.upcomingPlans === null;
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
                                ' D'  + a.subDistId +
                                ' V' + currentVol + '{' + a.subStartVol + '-' + a.subEndVol + '}' +
                                (a.isExpiring ? '**' : '') +
                                (a.upcomingPlans !== null ? '+' : ''),
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
                            , (a.subPhone === ( "" || null) ? "" : 'Mob: ' + a.subPhone)
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

export default function makeDistributionListData(distributorData, distributionDetails, susbcriberListData) {
    const arr = []
    const dataArr = dcopy(susbcriberListData); // deep copy for safer operations ahead 
    const totalSubscriber = distributionDetails.runningCount
    const expiryCount = distributionDetails.expiryCount
    const currentVol = distributionDetails.currentVol
    const expiries = dcopy(distributionDetails.expiries)
    const distPdfData = makeDistributorHeadline(distributorData, totalSubscriber, expiryCount, currentVol)
    const eh1 = dcopy(expiryHeadline);
    const eh2 = dcopy(expiryHeadline2);
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
    if (expiryCount > 0) {
        arr.push(eh1)
        arr.push(eh2);
        arr.push(makeExpiryData(expiries,expiryCount))
    }

    return arr;
}
