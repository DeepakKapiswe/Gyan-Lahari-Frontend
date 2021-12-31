import dcopy from "deep-copy";


function makeCirculationSummaryHeadline(issueNum, circulationCount, expiryCount) {
    return (
        {
            unbreakable: true,
            lineHeight: 0.85,
            fontSize: 16,
            table: {
                widths: ['*'],
                body: [
                    [
                        {
                            text: 'Distribution Summary' , fontSize: 20,
                            alignment: 'center'
                        },
                    ],
                    [ 
                    {
                        text: 'Total Circulation: ' + circulationCount + ' \t\t Volume: '+ issueNum + ' \t\t Expiries : ' + expiryCount  , fontSize: 16,
                        alignment: 'center'
                    },

                    ]

                ]
            }

        }
    )
}

// distid: "1"
// distname: "डाक"
// distadd: null
// distcity: "डाक द्वारा"
// distphone: null
// currcirculation: 930
// currexpirycount: 45

function singleCirculation(circulation) {
    const c = circulation
    return (
        [ (' ')
        ,  {text : c.distid, fontSize : 12}
        , {text : c.distname, fontSize : 13}
        , {text : c.distadd, fontSize : 12}
        , (c.distcity === ("" || null) ? "" : c.distcity )
        , (c.distphone === ("" || null) ? "" : c.distphone)
        , (c.currcirculation === ("" || null) ? "" : c.currcirculation)
        , (c.currexpirycount === ("" || null) ? "" : c.currexpirycount)
        ]
    )
}

const tableHeader = 
  [
   { text: ' ' , fontSize : 13},
   { text: 'Id' , fontSize : 13},
   { text: 'Name'      , fontSize : 13},
   { text: 'Address'        , fontSize : 13},
   { text: 'City'        , fontSize : 13},
   { text: 'Mobile No.'      , fontSize : 13},
   { text: 'Circulation'        , fontSize : 13},
   { text: 'Expiries'        , fontSize : 13}
   ]

function makeCirculationList(circulations) {
    const th = dcopy(tableHeader);
    const cirArr = [th];
    while (circulations.length > 0) {
        const c1 = circulations.shift();
        cirArr.push(singleCirculation(c1.circulationdetails))
    }
    return (
               { table: {
                   widths: [10,'auto','auto','auto','auto','auto','auto','auto'],
				   headerRows: 1,
				   body: cirArr
			    },
                fontSize : 13,
                margin: [1, 3, 0, 0], // sets gap between each row
                lineHeight: 0.75
		       });
    
}

			

export default function makeCirculationSummaryData(circulationSummaryData, cirMD) {
    const arr = [];
    const circulations = dcopy(circulationSummaryData); // deep copy for safer operations ahead 
    const circlulationCount = circulations.length;
    const distPdfData = makeCirculationSummaryHeadline( cirMD.circulationVolume, cirMD.totalCirculations, cirMD.totalExpiries)
    arr.push(distPdfData);
    (circlulationCount > 0)  && arr.push(makeCirculationList(circulations, circlulationCount));
    return arr;
}
