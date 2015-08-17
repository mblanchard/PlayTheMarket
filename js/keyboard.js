var PTM = PTM || {};
PTM.CreateKeyboard = (function(qwertyHancockDependency){
	//Dependency Guard
	if(qwertyHancockDependency === null || typeof qwertyHancockDependency === 'undefined'){
		if(window.debug_flag) { console.log("Qwerty Hancock dependency not provided"); }
		return;
	} var QwertyHancock = qwertyHancockDependency;
	//END: Dependency Guard
	
	
	var  settings = {
		id: 'keyboard',
		width: 600,
		height: 150,
		startNote: 'A2',
		whiteNotesColour: '#fff',
		blackNotesColour: '#000',
		borderColour: '#000',
		activeColour: 'yellow',
		octaves: 2
	};
	
	var Keyboard = function(elementId, waveType){
		var keyboard = this; 
		keyboard.nodes = []; 
		keyboard.QH = initQH(elementId); 
		keyboard.waveType = waveType; 
		keyboard.attackDelay = 0.0;
		keyboard.attackTime = 0.4;
		keyboard.startGain = 0.1;
		keyboard.peakGain = 1.0;
		keyboard.sustainTime = 1.0;
		keyboard.sustainGain = 0.1;
		return keyboard;
	}
	
	var initQH = function(elementId) {
		settings.id = elementId;
		var keyboard = new QwertyHancock(settings);
		return keyboard;
	}
	
	var setWaveType = function(waveType) {
		this.waveType = waveType;
	}
	
	var bindToAudioDestination = function(audioDestination) {
		//Key Down Event
		var k = this;
		this.QH.keyDown = function (note, frequency) {
			var oscillator = context.createOscillator();
			var gain = context.createGain();
			gain.gain.value = 0.1;
			oscillator.type = k.waveType;
			oscillator.frequency.value = frequency;
			oscillator.connect(gain);
			gain.connect(audioDestination);
			oscillator.start(0);
			//gain.gain.setTargetAtTime(1.0,context.currentTime, 0.4);
			gain.gain.setTargetAtTime(k.peakGain,context.currentTime + k.attackDelay,k.attackTime);
			//gain.gain.setTargetAtTime(k.sustainGain, context.currentTime + k.attackDelay+k.attackTime, k.sustainTime);
			k.nodes.push({osc: oscillator, g: gain});
		};		
			
		//Key Up Event
		this.QH.keyUp = function (note, frequency) {
			var new_nodes = [];
			for (var i = 0; i < k.nodes.length; i++) {
				if (Math.round(k.nodes[i].osc.frequency.value) === Math.round(frequency)) {
					k.nodes[i].osc.stop(0);
					k.nodes[i].g.disconnect();
					k.nodes[i].osc.disconnect();
				} else {
					new_nodes.push(k.nodes[i]);
				}
			}	
			k.nodes = new_nodes;
		};		
	}
	
	Keyboard.prototype = {
		bindToAudioDestination: bindToAudioDestination,
		setWaveType: setWaveType
	};
	
	Keyboard.prototype.constructor = Keyboard;
	return Keyboard;
})(QwertyHancock);
