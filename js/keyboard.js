var PTM = PTM || {};
PTM.CreateKeyboard = (function(qwertyHancockDependency){
	if(qwertyHancockDependency === null || typeof qwertyHancockDependency === 'undefined'){
		if(window.debug_flag) { console.log("Qwerty Hancock dependency not provided"); }
		return;
	} var QwertyHancock = qwertyHancockDependency;
	
	
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
	
	var Keyboard = function(elementId){var keyboard = this; keyboard.nodes = []; keyboard.QH = initQH(elementId); return keyboard;}
	
	var initQH = function(elementId) {
		settings.id = elementId;
		var keyboard = new QwertyHancock(settings);
		return keyboard;
	}
	
	var bindToAudioDestination = function(audioDestination, keyboard) {
		//Key Down Event
		var k = this;
		this.QH.keyDown = function (note, frequency) {
			var oscillator = context.createOscillator();
			oscillator.type = 'sine';
			oscillator.frequency.value = frequency;
			oscillator.connect(audioDestination);
			oscillator.start(0);
			k.nodes.push(oscillator);
		};		
			
		//Key Up Event
		this.QH.keyUp = function (note, frequency) {
			var new_nodes = [];
			for (var i = 0; i < k.nodes.length; i++) {
				if (Math.round(k.nodes[i].frequency.value) === Math.round(frequency)) {
					k.nodes[i].stop(0);
					k.nodes[i].disconnect();
				} else {
					new_nodes.push(k.nodes[i]);
				}
			}	
			k.nodes = new_nodes;
		};		
	}
	
	Keyboard.prototype = {
		bindToAudioDestination
	};
	
	Keyboard.prototype.constructor = Keyboard;
	return Keyboard;
})(QwertyHancock);
