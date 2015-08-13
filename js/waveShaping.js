var PTM = PTM || {};
PTM.WaveShaping = {	
	createWaveShaperFromArray : function(array, maxIntensity, context) {
		var distortion = context.createWaveShaper();
		var maxValue = arrayMax(array); var minValue = arrayMin(array);
		var vertShift = (maxValue+minValue)/2; var intensityShift = maxIntensity/ ( (maxValue-minValue) /2 );
		var normalize=function(value){return (value - vertShift) * intensityShift;}
		var curve = new Float32Array(array.length);
		for(var i = 0; i < array.length-1; i++) {
			curve[i] = normalize(array[i]);
		}
		if(window.debug_flag) { console.log(curve); }
		distortion.curve = curve;
		distortion.oversample = '4x';
		return distortion;
		
	},
	
	transformQuandlStockData: function(array) {
		array.shift();
		array.pop();
		var closeValues = array.map(function(d){return parseFloat(d[4]);});
		return levelArray(closeValues);
	}	
};