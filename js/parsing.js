var PTM = PTM || {};

(function(papaDependency){
	//Dependency Guards
	if(papaDependency === null || typeof papaDependency === 'undefined'){
		if(window.debug_flag) { console.log("PapaParse dependency not provided"); }
		return;
	} var Papa = papaDependency;
	//END: Depedency Guards
	
	//Creates Quandl request from ticker symbol and date range
	var buildStockDataURL = function(tickerSymbol,startDate,endDate) {
		return "https://www.quandl.com/api/v3/datasets/WIKI/" + tickerSymbol 
		+ ".csv?sort_order=asc&exclude_headers=true&trim_start="  + startDate 
		+ "&trim_end="  + endDate 
		+ "&column=4&transformation=rdiff";
	}
	
	//YYYY-MM-DD
	var isValidDateFormat = function(dateString){
		var regex = /\d{4}-\d{2}-\d{2}/g;
		return regex.test(dateString);	
	}
	
	var parseCSVAtURL = function(url, callback) {
		Papa.parse(url, {download: true, complete: callback});
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
	
	
	//Module Export
	PTM.Parsing = {
		parseCSVAtURL : parseCSVAtURL,
		parseStockData : parseStockData
	}		
})(Papa);
