var PTM = PTM || {};

(function(){
	var onSelectWaveType = function(list, keyboard) {
		keyboard.setWaveType(list.value);
	}
	
	var bindToElementEvent = function(eventHandler, id, event) {
		var el = document.getElementById(id);
		if(el === null || typeof el === 'undefined') {
			if(window.debug_flag)console.log('Element #'+id+' Not Found'); return;
		}
		el.addEventListener(event,eventHandler);
	};
	
	var bindToWaveTypeChange = function(eventHandler) {
		bindToElementEvent(eventHandler, 'waveType','change');
	}
	
	var bindToStockUpdateSubmit = function(eventHandler) {
		bindToElementEvent(eventHandler, 'stockSubmit','click');
	}
	
	var getFieldValue = function(id) {
		var el = document.getElementById(id);
		if(el === null || typeof el === 'undefined') {
			if(window.debug_flag)console.log('Element #'+id+' Not Found'); return;
		}
		return el.value;
	}
	
	//Module Exports
	PTM.Form = {
		bindToWaveTypeChange: bindToWaveTypeChange,
		bindToStockUpdateSubmit: bindToStockUpdateSubmit,
		getFieldValue: getFieldValue
	};
	
})();