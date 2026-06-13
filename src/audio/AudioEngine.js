export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.engineOsc = null;
    this.engineGain = null;
    this.musicGain = null;
    this.musicBuffer = null;
    this.musicSource = null;
    this.isPlaying = false;
  }

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.5;
      this.masterGain.connect(this.ctx.destination);

      this.engineGain = this.ctx.createGain();
      this.engineGain.gain.value = 0.15;
      this.engineGain.connect(this.masterGain);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.25;
      this.musicGain.connect(this.masterGain);
    } catch (e) {
      console.warn('Audio not available:', e);
    }
  }

  startEngine() {
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;

    this.engineOsc = this.ctx.createOscillator();
    this.engineOsc.type = 'sawtooth';
    this.engineOsc.frequency.value = 80;
    this.engineOsc.connect(this.engineGain);
    this.engineOsc.start();
  }

  updateEngine(speed, maxSpeed, nitro = false) {
    if (!this.engineOsc) return;
    const ratio = Math.min(speed / maxSpeed, 1);
    const freq = 60 + ratio * 200 + (nitro ? 50 : 0);
    this.engineOsc.frequency.linearRampToValueAtTime(freq, this.ctx.currentTime + 0.05);
    this.engineGain.gain.value = 0.08 + ratio * 0.15 + (nitro ? 0.05 : 0);
  }

  stopEngine() {
    if (this.engineOsc) {
      try { this.engineOsc.stop(); } catch (e) {}
      this.engineOsc = null;
    }
    this.isPlaying = false;
  }

  playNitroSound(level) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.masterGain);

    const freqs = { 1: 300, 2: 600, 3: 1200 };
    osc.frequency.value = freqs[level] || 300;
    osc.type = 'sawtooth';
    gain.gain.value = 0.1;
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  playCrash(intensity = 1) {
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * intensity * Math.exp(-i / (bufferSize * 0.1));
    }
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.value = 0.3 * intensity;
    source.connect(gain);
    gain.connect(this.masterGain);
    source.start();
  }

  playUIClick() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.frequency.value = 800;
    gain.gain.value = 0.05;
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playSuccess() {
    if (!this.ctx) return;
    [523, 659, 784].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.frequency.value = freq;
      osc.type = 'square';
      gain.gain.value = 0.08;
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3 + i * 0.15);
      osc.start(this.ctx.currentTime + i * 0.15);
      osc.stop(this.ctx.currentTime + 0.3 + i * 0.15);
    });
  }

  playFail() {
    if (!this.ctx) return;
    [400, 300].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.frequency.value = freq;
      osc.type = 'sawtooth';
      gain.gain.value = 0.08;
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4 + i * 0.2);
      osc.start(this.ctx.currentTime + i * 0.2);
      osc.stop(this.ctx.currentTime + 0.4 + i * 0.2);
    });
  }

  resume() {
    if (this.ctx?.state === 'suspended') this.ctx.resume();
  }
}
