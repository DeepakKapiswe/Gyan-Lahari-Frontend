export default function pdfConfig() {
    const config = {
            defaultStyle: {
                font: 'NotoSans',
                fontSize: 13,
            },
            pageMargins: [15, 20, 7, 5],
            pageBreakBefore(currentNode) {
                return currentNode.pageNumbers.length > 1 && currentNode.unbreakable;
            },
            background: function (page) {
                return {
                    fontSize: 10,
                    alignment: 'right',
                    stack: ['Page No: ' + page]
                }
            }
        }
    return config
}
