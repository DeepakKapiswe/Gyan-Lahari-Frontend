export default function pdfLabelConfig() {
    const config = {
            defaultStyle: {
                font: 'NotoSans',
                fontSize: 12,
            },
            pageSize: { width: 75, height: 50 },
            pageMargins: [-3, -3, 0, 0],
            // old original ->  pageMargins: [15, 20, 7, 5],
            pageBreakBefore(currentNode) {
                return currentNode.pageNumbers.length > 1 && currentNode.unbreakable;
            },
            // background: function (page) {
            //     return {
            //         fontSize: 10,
            //         alignment: 'right',
            //         stack: ['Page No: ' + page]
            //     }
            // }
        }
    return config
}
