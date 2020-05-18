import makePdfSubscriberListData from './pdfSubscriberListData';
import makePdfDistributionListData from './pdfDistributionList';
import makePdfBulkDistributionListData from './pdfBulkDistributionList';
import makePdfExpiryListData from './pdfExpiryList';
import makePdfBulkExpiryListData from './pdfBulkExpiryList';


// create pdf data for different types of result embedding particular info
export default function createPdfData(pdfInfo){
	var fn;
	const meta = pdfInfo.meta;
	var getPdfDataFor = {
		'DistributionList' : function () {
			return makePdfDistributionListData(pdfInfo.distributorData, pdfInfo.distributionDetails, pdfInfo.subscriberListData);
		   },
		'BulkDistributionList' : function () {
			return makePdfBulkDistributionListData(pdfInfo.bulkDistributionData);
		   },
		'ExpiryList' : function () {
			return makePdfExpiryListData(pdfInfo.distributorData, pdfInfo.expiryDetails, pdfInfo.subscriberListData);
		   },
		'BulkExpiryList' : function () {
			return makePdfBulkExpiryListData(pdfInfo.bulkExpiryListData);
		   },
		'SearchResultList' : function () {
			return makePdfSubscriberListData(pdfInfo.subscriberListData);
		},
		'AllSubscribers' : function () {
			return makePdfSubscriberListData(pdfInfo.subscriberListData);
		},
		'SubscriberList' : function () {
			return makePdfSubscriberListData(pdfInfo.subscriberListData);
		}
	}
	if (getPdfDataFor[meta]) {
		fn = getPdfDataFor[meta];
	}
	else {
		fn = getPdfDataFor['SubscriberList'];
	}
	return fn();
}