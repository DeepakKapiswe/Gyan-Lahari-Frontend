import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import makePdfSubscriberListData from '../PdfSubscriberList/PdfSubscriberList';
import vfsFonts from 'pdfmake/build/vfs_fonts'

pdfMake.fonts = {
	NotoSans: {
		normal: 'NotoSans-Regular.ttf',
		bold: 'NotoSans-Regular.ttf',
		italics: 'NotoSans-Regular.ttf',
		bolditalics: 'NotoSans-Regular.ttf',
	}
};

export default function PdfView(props) {
	const rawPdfData = props.location.state.data
	const pdfData = makePdfSubscriberListData(rawPdfData)
	const {vfs} = vfsFonts.pdfMake;
	pdfMake.vfs = vfs;

	pdfMake.createPdf(pdfData).open();
	return <>Pdf Generated</>
}