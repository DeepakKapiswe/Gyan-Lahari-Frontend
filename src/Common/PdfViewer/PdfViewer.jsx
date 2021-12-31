import React from "react";
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from 'pdfmake/build/vfs_fonts'
import createPdfData from '../PdfGeneration/createPdfData';
import { navigate } from '@reach/router';

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
	const pdfData = createPdfData(rawPdfData);
	const {vfs} = vfsFonts.pdfMake;
	pdfMake.vfs = vfs;

	pdfMake.createPdf(pdfData).open();

	navigate(-1);
	return <>Pdf Generated</>
}