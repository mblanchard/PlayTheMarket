window.debug_flag = true;
			

var compressor = PTM.Audio.createCompressor();
var gain = PTM.Audio.createGain(0.3);
var keyboard = new PTM.CreateKeyboard('keyboard','sine');
var distortion = null;

compressor.connect(gain); 
gain.connect(PTM.Audio.context.destination); 
keyboard.bindToAudioDestination(compressor);

var updateStockData = function() {
	var stockSymbol = PTM.Form.getFieldValue('symbol');
	var startDate = PTM.Form.getFieldValue('start');
	var endDate = PTM.Form.getFieldValue('end');
	
	PTM.Parsing.parseStockData(stockSymbol, startDate, endDate, 
		function(results) {
			distortion = PTM.WaveShaping.quandlStockDataToWaveShaper(results.data,1);
			distortion.connect(compressor);
			keyboard.bindToAudioDestination(distortion);
		}
	);
	return false;				
}

var updateWaveType = function(event){
	keyboard.setWaveType(event.target.value);
}

PTM.Form.bindToStockUpdateSubmit(updateStockData);
PTM.Form.bindToWaveTypeChange(updateWaveType);

//"MSFT","2012-03-30","2015-07-30"


