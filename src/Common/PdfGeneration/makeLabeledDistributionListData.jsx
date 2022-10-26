import dcopy from "deep-copy";

function makeSubscriberCell(subscriber, currentVol) {
    const a = subscriber
    a.subStartVol = a.currPlan ? a.currPlan.substartvol : a.subscriptions[0].substartvol
    a.subEndVol = a.currPlan ? a.currPlan.subendvol : a.subscriptions[0].subendvol
    a.isExpiring = a.subEndVol === currentVol && a.upcomingPlans === null;
    return (
        {
            margin: [0, 0, 0, 0], // sets gap between each row
            // margin: [8, 9, 0, 0], // sets gap between each row
            // lineHeight: 0.85,
            lineHeight: 0.84,
            decorationStyle: 'dashed',
            fontSize : 4,

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

export default function makeLabeledDistributionListData(distributionDetails, susbcriberListData) {
    const arr = []
    const dataArr = dcopy(susbcriberListData); // deep copy for safer operations ahead 
    const currentVol = distributionDetails.currentVol
    while (dataArr.length > 0) { // remove first three elements of Data Array
        const a1 = dataArr.shift();
        arr.push(
            {
                unbreakable: true,
                columns: [
                    makeSubscriberCell(a1, currentVol),
                ]
            })
        dataArr.slice(1);
    }
    return arr;
}