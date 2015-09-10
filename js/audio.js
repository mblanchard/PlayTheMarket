var PTM = PTM || {};
(function(){
	
	var context = new (window.AudioContext || window.webkitAudioContext)();
	
	var createOscillator = function(waveType, freq) {
		var oscillator = context.createOscillator();
		oscillator.type = waveType;
		oscillator.frequency.value = freq; // value in hertz
		return oscillator;
	};
	
	var createCompressor = function() {		
		var compressor = context.createDynamicsCompressor();
		compressor.threshold.value = -60;
		compressor.knee.value = 10;
		compressor.ratio.value = 20;
		compressor.reduction.value = -20;
		compressor.attack.value = 0;
		compressor.release.value = 0.25;
		return compressor;
	};
	
	var createWaveShaper = function(curve) {
		var waveShaper	 = context.createWaveShaper();
		waveShaper.curve = curve;
		waveShaper.oversample = '4x';
		return waveShaper;
	}
	
	var createGain = function(level) {
		var newGain = context.createGain();
		newGain.gain.value = level;
		return newGain;
	};
	
	//Module Export			
	PTM.Audio = {		
		context : context,		
		createOscillator : createOscillator,		
		createCompressor : createCompressor,		
		createGain : createGain,
		createWaveShaper: createWaveShaper
	}
})();
