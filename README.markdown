# WebAHDSR
An envelope generator for WebAudio AudioParam.  

### Installation

Include `src/web-ahdsr.js` in your HTML document:

	<script type="text/javascript" src="<path-to-web-ahdsr>/src/web-ahdsr.js"></script>

### Usage:

WebAHDSR requires an AudioContext and an AudioParam to control. The following example demonstrates how to control the volume (gain) of an oscillator:

	// Create an AudioContext:
	var context = null;
	if (typeof window.AudioContext != 'undefined') {
		context = new AudioContext();
	} else if (typeof window.webkitAudioContext != 'undefined') {
		context = new webkitAudioContext();
	}

	if (!context) {
		console.log('Web Audio API is not supported.');
		return;
	}

	// Create an oscillator:
	var osc = context.createOscillator();
	osc.type = 'sine';
	osc.frequency.value = 440.0;

	// Create a gain node:
	var gainNode = context.createGain();
	gainNode.gain.value = 0.0;

	// Connect the oscillator to the gain node and start it:
	osc.connect(gainNode);
	osc.start(0);

	// Connect the gain node to the context's destination (output):
	gainNode.connect(context.destination);

	// Create a WebAHDSR to control the gain node:
	var gainAHDSR = new WebAHDSR(context, gainNode.gain);

	// Configure the envelope times:
	gainAHDSR.attackTime = 2.0;
	gainAHDSR.holdTime = 1.0;
	gainAHDSR.decayTime = 2.0;
	gainAHDSR.releaseTime = 2.0;

	// Configure the envelope values:
	gainAHDSR.initialValue = 0.0; // Value before the attack period
	gainAHDSR.holdValue = 1.0; // Value during the hold period (between attack and decay)
	gainAHDSR.sustainValue = 0.3; // Value during the sustain period (between decay and release)
	gainAHDSR.finalValue = 0.0; // Value after the release period

	// Configure the envelope curves ('linear' or 'exponential'):
	gainAHDSR.attackCurve = 'exponential';
	gainAHDSR.decayCurve = 'exponential';
	gainAHDSR.releaseCurve = 'exponential';

Start the attack-hold-decay-sustain period:

	gainAHDSR.on();

Start the release period:

	gainAHDSR.off();

Reset the envelope generator:

	gainAHDSR.reset();

WebAHDSR can also be used to control the oscillator frequency:

	// Create a WebAHDSR to control the oscillator frequency:
	var freqAHDSR = new WebAHDSR(context, osc.frequency);

	// Configure the envelope times:
	freqAHDSR.attackTime = 0.5;
	freqAHDSR.holdTime = 0.0;
	freqAHDSR.decayTime = 0.5;
	freqAHDSR.releaseTime = 0.0;

	// Configure the envelope values:
	freqAHDSR.initialValue = osc.frequency.value; // Begin at the oscillator's normal frequency
	freqAHDSR.holdValue = osc.frequency.value * 2.0; // Ramp up one octave for the hold period
	freqAHDSR.sustainValue = osc.frequency.value; // Sustain at the oscillator's normal frequency
	freqAHDSR.finalValue = osc.frequency.value; // End at the oscillator's normal frequency

	// Configure the envelope curves ('linear' or 'exponential'):
	freqAHDSR.attackCurve = 'exponential';
	freqAHDSR.decayCurve = 'exponential';
	freqAHDSR.releaseCurve = 'exponential';

### License:
WebAHDSR is made available under the MIT License. See LICENSE.txt for details.  

### Credits:
WebAHDSR was created by [Tony Wallace](http://tonywallace.ca).  

