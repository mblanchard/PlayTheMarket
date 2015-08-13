var WaveShaping = (function() {
		
	var WaveShaping = function() {
		var waveShaping = this; 
		return waveShaping;
	}	
	
	var createWaveShaperFromArray = function(array, maxIntensity, context) {
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
		
	}		
	
	WaveShaping.prototype = {
		createWaveShaperFromArray: createWaveShaperFromArray,
	};
	
	WaveShaping.prototype.constructor = WaveShaping;	
	return WaveShaping;	
})();


var waveShaping = new WaveShaping();