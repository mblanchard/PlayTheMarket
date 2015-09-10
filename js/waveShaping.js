var PTM = PTM || {};
(function(){	
	//Dependency Guard
	if(PTM.Audio === null || typeof PTM.Audio === 'undefined'){
		if(window.debug_flag) { console.log("Audio dependency not provided"); } return;
	}
	//END: Dependency Guard
	
	
	//Find min value in array
	function arrayMin(arr) {
		var len = arr.length, min = Infinity;
		while (len--) {
			if (arr[len] < min) {
			min = arr[len];
			}
		}
		return min;
	};
	
	//Find max value in array
	function arrayMax(arr) {
		var len = arr.length, max = -Infinity;
		while (len--) {
			if (arr[len] > max) {
			max = arr[len];
			}
		}
		return max;
	};
	
	//Find linear regression of array (assumes evenly-spaced y vals for purpose of this project)
	function linearRegression(array){
		var lr = {};
		var n = array.length;
		var sum_x = 0;
		var sum_y = 0;
		var sum_xy = 0;
		var sum_xx = 0;
		var sum_yy = 0;
		for (var i = 0; i < array.length-1; i++) {		
			sum_x += i;
			sum_y += array[i];
			sum_xy += (i*array[i]);
			sum_xx += (i*i);
			sum_yy += (array[i]*array[i]);
		} 
		
		lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
		lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
		lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);
		
		return lr;
	}
	
	//Array line-levelling
	function levelArray(array) {
		var lr = linearRegression(array);
		var leveledArray = [];
		array.forEach(function(el,i){
			leveledArray.push( (array[i] - ((i*lr.slope) + lr.intercept)) );
		});
		return leveledArray;
	}
	
	var transformQuandlStockData = function(array) {
		array.shift(); //header
		array.pop(); //empty last row
		var closeValues = array.map(function(d){return parseFloat(d[4]);});
		return levelArray(closeValues);
	};
	
	var createWaveShaperCurveFromArray = function(array, maxIntensity) {
		var maxValue = arrayMax(array); var minValue = arrayMin(array);
		var vertShift = (maxValue+minValue)/2; var intensityShift = maxIntensity/ ( (maxValue-minValue) /2 );
		var normalize=function(value){return (value - vertShift) * intensityShift;}
		var curve = new Float32Array(array.length);
		for(var i = 0; i < array.length-1; i++) {
			curve[i] = normalize(array[i]);
		}
		if(window.debug_flag) { console.log(curve); }
		return curve;	
	};
	
	var quandlStockDataToWaveShaper = function(array, maxIntensity) {
		var levelArray = transformQuandlStockData(array);
		var curve = createWaveShaperCurveFromArray(levelArray, maxIntensity);
		return PTM.Audio.createWaveShaper(curve);
	}
		
	//Module Exports
	PTM.WaveShaping = {
		quandlStockDataToWaveShaper: quandlStockDataToWaveShaper
	}	
})();
