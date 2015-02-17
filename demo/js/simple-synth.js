function SimpleSynth(context) {

	// Private:

	var _self = this;

	// Public:

	this.context = context;
	this.osc1 = null;
	this.osc2 = null;
	this.gainNode = null;
	this.gainEnvelope = null;
	this.osc2FreqEnvelope = null;

	this.init = function(options) {
		// Configure oscillator 1:
		_self.osc1 = _self.context.createOscillator();
		_self.osc1.type = 'sine';
		_self.osc1.frequency.value = 440.0;
		_self.osc1.detune.value = 0;

		// Configure oscillator 2:
		_self.osc2 = _self.context.createOscillator();
		_self.osc2.type = 'sine';
		_self.osc2.frequency.value = 440.0;
		_self.osc2.detune.value = 0;

		// Configure the gain node:
		_self.gainNode = _self.context.createGain();
		_self.gainNode.gain.value = 0.0;

		// Connect the oscillators to the gain node:
		_self.osc1.connect(_self.gainNode);
		_self.osc2.connect(_self.gainNode);
		_self.gainNode.connect(_self.context.destination);

		// Configure the gain envelope:
		_self.gainEnvelope = new WebAHDSR(_self.context, _self.gainNode.gain);
		_self.gainEnvelope.attackTime = 2.0;
		_self.gainEnvelope.holdTime = 1.0;
		_self.gainEnvelope.decayTime = 2.0;
		_self.gainEnvelope.releaseTime = 2.0;
		_self.gainEnvelope.sustainValue = 0.3;

		// Configure the oscillator 2 frequency envelope:
		_self.osc2FreqEnvelope = new WebAHDSR(_self.context, _self.osc2.frequency);
		_self.osc2FreqEnvelope.attackTime = 0.5;
		_self.osc2FreqEnvelope.releaseTime = 2.0;
		_self.osc2FreqEnvelope.initialValue = _self.osc2.frequency.value;
		_self.osc2FreqEnvelope.holdValue = _self.osc2.frequency.value * 2.0;
		_self.osc2FreqEnvelope.sustainValue = _self.osc2.frequency.value * 2.0;
		_self.osc2FreqEnvelope.finalValue = _self.osc2.frequency.value;
		_self.osc2FreqEnvelope.attackCurve = 'exponential';
		_self.osc2FreqEnvelope.releaseCurve = 'exponential';

		// Start the oscillators:
		_self.osc1.start(0);
		_self.osc2.start(0);
	}

	this.noteOn = function() {
		_self.gainEnvelope.on();
		_self.osc2FreqEnvelope.on();
	}

	this.noteOff = function() {
		_self.osc2FreqEnvelope.off();
		_self.gainEnvelope.off();
	}

}