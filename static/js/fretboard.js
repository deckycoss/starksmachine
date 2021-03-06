function Fretboard(){
	this.context = new AudioContext();
	this.instrument = new Stark(this.context, 2);
	this.instrument.operators[0].oscillator.type = "triangle";
	this.instrument.operators[0].envelope.attackTime = 0;
	this.instrument.operators[0].envelope.decayTime = .1;
	this.instrument.operators[0].envelope.sustainLevel = .6;
	this.instrument.operators[0].envelope.releaseTime = .4;

	this.instrument.operators[1].oscillator.type = "square";
	this.instrument.operators[1].envelope.attackTime = 0;
	this.instrument.operators[1].envelope.decayTime = .1;
	this.instrument.operators[1].envelope.releaseTime = .4;
	this.instrument.operators[1].envelope.sustainLevel = .6;
	this.instrument.operators[1].oscillator.detune.value = 10;

	this._currentNote = -1;
	this._currentInterval;
}

Fretboard.prototype.play = function(x, y, width, height){
	var pitch = Math.floor((x / width) * 64) + 32;
	if (this._currentNote != pitch){
		this._currentNote = pitch;
		this.instrument.noteOn(pitch, 1);
	}
}

Fretboard.prototype.mousedown = function(event){
	if (event.which != 1){
		return;
	}

	this.play(event.clientX, null, $(window).width());

}

Fretboard.prototype.mouseup = function(event){
	this.instrument.noteOff();
	clearInterval(this._currentInterval);
	this._currentNote = -1;
}

Fretboard.prototype.mousemove = function(event){
	if (this._currentNote == -1){
		return;
	}
	this.mousedown(event);
}

window.onload = function(){
	window.machine = new Fretboard();
}

$(window).mousedown(function(event){
	window.machine.mousedown(event);
});

$(window).mouseup(function(event){
	window.machine.mouseup(event);
});

$(window).mousemove(function(event){
	window.machine.mousemove(event);
});