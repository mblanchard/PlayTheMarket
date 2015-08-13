var PTM = PTM || {};
(function(){
	
	var initContext = function() { return new (window.AudioContext || window.webkitAudioContext)();	};
	
	var createOscillator = function(context, waveType, freq) {
		var oscillator = context.createOscillator();
		oscillator.type = waveType;
		oscillator.frequency.value = freq; // value in hertz
		oscillator.connect(context.destination);
		oscillator.start(0);
		return oscillator;
	};
	
	var createCompressor = function(context) {		
		var compressor = context.createDynamicsCompressor();
		compressor.threshold.value = -60;
		compressor.knee.value = 10;
		compressor.ratio.value = 20;
		compressor.reduction.value = -20;
		compressor.attack.value = 0;
		compressor.release.value = 0.25;
		return compressor;
	};
	
	var createGain = function(context, level) {
		var newGain = context.createGain();
		newGain.gain.value = level;
		return newGain;
	};
	
	//Module Export			
	PTM.Audio = {			
		initContext : initContext,	
		createOscillator : createOscillator,		
		createCompressor : createCompressor,		
		createGain: createGain
	}
})();
