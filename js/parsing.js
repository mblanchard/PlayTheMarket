var PTM = PTM || {};
PTM.Parsing = (function(papaDependency){	
	
	if(papaDependency === null || typeof papaDependency === 'undefined'){
		if(window.debug_flag) { console.log("PapaParse dependency not provided"); }
		return;
	} var Papa = papaDependency;

	var Parsing = function() {var parsing = this; return parsing;}
	
	var parseCSVAtURL = function(url, callback) {
		Papa.parse(url, {download: true, complete: callback});
	}
	
	var buildStockDataURL = function(tickerSymbol,startDate,endDate) {
		return "https://www.quandl.com/api/v3/datasets/WIKI/" + tickerSymbol 
		+ ".csv?sort_order=asc&exclude_headers=true&trim_start="  + startDate 
		+ "&trim_end="  + endDate 
		+ "&column=4&transformation=rdiff";
	}
	
	var isValidDateFormat = function(dateString){
		var regex = /\d{4}-\d{2}-\d{2}/g;
		return regex.test(dateString);	
	}
	
	var parseStockData = function(tickerSymbol,startDate,endDate, callback){
		var invalidDate = !isValidDateFormat(startDate) || !isValidDateFormat(endDate);
		if(invalidDate) { 
			if(window.debug_flag) { console.log("Invalid Date passed to parseStockData"); }
			return;
		}
		var url = buildStockDataURL(tickerSymbol, startDate, endDate);	
		parseCSVAtURL(url, callback);
	}
	
	Parsing.prototype = {
		parseCSVAtURL: parseCSVAtURL,
		parseStockData: parseStockData
	}	
	
	Parsing.prototype.constructor = Parsing;	
	return Parsing;	
})(Papa);

var parsing = new PTM.Parsing();



