import React from "react";
import dcopy from "deep-copy";
import notoSansHindi from '../../assets/fonts/NotoSansDevanagari-Regular.ttf'
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font
} from "@react-pdf/renderer";


const BORDER_COLOR = '#bfbfbf'
const BORDER_STYLE = 'solid'
const COLN_WIDTH = 100 / 3
const FONT_FAMILY = 'Noto Sans Hindi'

Font.register({
    src: notoSansHindi,
    family: FONT_FAMILY
    }
  );

Font.registerHyphenationCallback(word => [word]);

const styles = StyleSheet.create({
    body: {
        padding: 8,
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        // paddingBottom: 0
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableColHeader: {
        width: COLN_WIDTH + '%',
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderBottomColor: '#000',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCol: {
        width: COLN_WIDTH + '%',
        borderStyle: BORDER_STYLE,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1
    },
    tableCellHeader: {
        margin: 5,
        fontSize: 12,
        fontWeight: 500
    },
    tableCell: {
        margin: 5,
        fontSize: 10
    },
    hindi: {
        margin: 8,
        fontSize: 13,
        fontFamily: FONT_FAMILY
    },
    row: {
        flexDirection: 'row',
        margin: 3,
    },
    column: {
        flexDirection: 'column',
    },
    cell: {
        flexGrow: 1,
        margin: 4,
        marginLeft: 4,
        marginBottom: 2,
        fontSize: 13,
        fontFamily: FONT_FAMILY
    },
    heading: {
        textAlign: 'center',
        fontFamily: FONT_FAMILY,
    },
    pageNumbers: {
        position: 'relative',
        right: 1,
        textAlign: 'right',
        fontSize: 10,
        fontFamily: FONT_FAMILY
    },
});
//   

function RenderSubscriber(props) {
    const a = props.subscriber
    return (
        <Text style={styles.cell} key={props.key}>
            SC:{a.subId}{' '}DC:{a.subDistId}{' '}
            V({a.subStartVol}-{+a.subStartVol + (a.subSubscriptionType * 4) - 1}){'\n'}
            {a.subName}{'\n'}
            {a.subAbout === ("" || null) ? "" : a.subAbout + '\n'}
            {a.subAdd1 === ("" || null) ? "" : a.subAdd1 + '\n'}
            {a.subAdd2 === ("" || null) ? "" : a.subAdd2 + '\n'}
            {a.subPost === ("" || null) ? "" : a.subPost + '\n'}
            {a.subCity === ("" || null) ? "" : a.subCity + '\n'}
            {a.subState === ("" || null) ? "" : a.subState + '\n'}
            {a.subPincode === ("" || null) ? "" : a.subPincode + '\n'}
            {a.subPhone === ("" || null) ? "" : 'Mob: ' + a.subPhone + '\n'}
        </Text>
    )

}

export default function PdfSubscriberList(props) {
    console.log("pdf props", props.data)
    const arr = []
    const dataArr = dcopy(props.data); // deep copy is necessary for stable react-pdf 
    var i = 0;
    while (dataArr.length > 0) { // remove first three elements of Data Array
        const a1 = dataArr.shift();
        const a2 = dataArr.shift();
        const a3 = dataArr.shift();
        arr.push(
            <View style={styles.tableRow} key={i}>
                <View style={styles.tableCol} wrap={false}>
                    <RenderSubscriber subscriber={a1} key={i + 2} />
                </View>
                <View style={styles.tableCol} wrap={false}>
                    {a2 && <RenderSubscriber subscriber={a2} key={i + 4} />}
                </View>
                <View style={styles.tableCol} wrap={false}>
                    {a3 && <RenderSubscriber subscriber={a3} key={i + 6} />}
                </View>
            </View>
        )
        dataArr.slice(3);
        i = i + 7;

    }
    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <View style={styles.table}>
                    <Text style={styles.heading} >
                    श्री माधव त्रिपाठी शर्मा
                    </Text>
                    {arr}
                    <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                        `Page  ${pageNumber} / ${totalPages}`
                    )} fixed />
                </View>
            </Page>
        </Document>
    );
}
