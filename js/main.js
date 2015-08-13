window.debug_flag = true;
			
var context = PTM.Audio.initContext();
var compressor = PTM.Audio.createCompressor(context);
var gain = PTM.Audio.createGain(context, 0.3);
var keyboard = new PTM.CreateKeyboard('keyboard','sine');
var distortion = null;

compressor.connect(gain); 
gain.connect(context.destination); 

var updateStockData = function() {
	var stockSymbol = PTM.Form.getFieldValue('symbol');
	var startDate = PTM.Form.getFieldValue('start');
	var endDate = PTM.Form.getFieldValue('end');
	
	PTM.Parsing.parseStockData(stockSymbol, startDate, endDate, 
		function(results) {
			distortion = PTM.WaveShaping.quandlStockDataToWaveShaper(results.data,1,context);
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


