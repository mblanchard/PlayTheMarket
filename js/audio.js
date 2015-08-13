var PTM = PTM || {};
PTM.Audio = {

	initContext : function() {
		return new (window.AudioContext || window.webkitAudioContext)();

	},
	
	createOscillator : function(context, waveType, freq) {
		var oscillator = context.createOscillator();
		oscillator.type = waveType;
		oscillator.frequency.value = freq; // value in hertz
		oscillator.connect(context.destination);
		oscillator.start(0);
		return oscillator;
	},
	
	createCompressor : function(context) {		
		var compressor = context.createDynamicsCompressor();
		compressor.threshold.value = -60;
		compressor.knee.value = 10;
		compressor.ratio.value = 20;
		compressor.reduction.value = -20;
		compressor.attack.value = 0;
		compressor.release.value = 0.25;
		return compressor;
	},
	
	createGain: function(context, level) {
		var newGain = context.createGain();
		newGain.gain.value = level;
		return newGain;
	}
}