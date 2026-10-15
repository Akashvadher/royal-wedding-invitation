/**
 * Authentic Royal Wedding Ambient Sound Generator
 * Generates an auspicious Indian wedding instrumental harmony (Shehnai/Bansuri melody + Tanpura drone)
 * using the standard browser Web Audio API. 100% self-contained and reliable.
 */

class WeddingAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private droneOscillators: OscillatorNode[] = [];
  private gainMaster: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.gainMaster = this.ctx.createGain();
      this.gainMaster.gain.setValueAtTime(0.25, this.ctx.currentTime);
      this.gainMaster.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a soft bell or wax breaking chime
  public playWaxSealCrack() {
    try {
      this.initContext();
      if (!this.ctx) return;
      
      const now = this.ctx.currentTime;
      // High chime bell
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.8);
      
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.85);

      // Low thump
      const thump = this.ctx.createOscillator();
      const thumpGain = this.ctx.createGain();
      thump.type = 'triangle';
      thump.frequency.setValueAtTime(120, now);
      thump.frequency.exponentialRampToValueAtTime(40, now + 0.25);
      thumpGain.gain.setValueAtTime(0.4, now);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      thump.connect(thumpGain);
      thumpGain.connect(this.ctx.destination);
      thump.start(now);
      thump.stop(now + 0.3);
    } catch {
      // Audio not permitted yet
    }
  }

  // Play scratch sparkle chime
  public playScratchChime() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const notes = [587.33, 659.25, 739.99, 880, 987.77, 1174.66];
      const note = notes[Math.floor(Math.random() * notes.length)];
      osc.frequency.setValueAtTime(note, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // ignore
    }
  }

  // Start regal Indian wedding background melody (Raag Yaman notes: D4, E4, F#4, G#4, A4, B4, C#5, D5)
  public startMusic() {
    if (this.isPlaying) return;
    this.initContext();
    if (!this.ctx || !this.gainMaster) return;

    this.isPlaying = true;

    // Start soft Tanpura Sa-Pa drone (D3: 146.83 Hz, A3: 220 Hz, D4: 293.66 Hz)
    const baseFreqs = [146.83, 220.0, 293.66];
    this.droneOscillators = baseFreqs.map((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx!.currentTime);
      osc.connect(gain);
      gain.connect(this.gainMaster!);
      osc.start();
      return osc;
    });

    // Raag Yaman / Wedding Bansuri scale frequencies
    const melodyScale = [
      293.66, // D4 (Sa)
      329.63, // E4 (Re)
      369.99, // F#4 (Ga)
      415.30, // G#4 (Teevrak Ma)
      440.00, // A4 (Pa)
      493.88, // B4 (Dha)
      554.37, // C#5 (Ni)
      587.33, // D5 (Taar Sa)
      659.25, // E5
      739.99  // F#5
    ];

    const melodyPhrase = [
      0, 1, 2, 4, 3, 2, 1, 0,
      4, 5, 6, 7, 6, 4, 2, 0,
      1, 2, 4, 6, 7, 8, 7, 6,
      4, 2, 3, 2, 1, 0
    ];

    let noteIndex = 0;
    this.intervalId = window.setInterval(() => {
      if (!this.isPlaying || !this.ctx || !this.gainMaster) return;

      const scaleIdx = melodyPhrase[noteIndex % melodyPhrase.length];
      const freq = melodyScale[scaleIdx];
      noteIndex++;

      const now = this.ctx.currentTime;
      // Bansuri-like flute wave with slight breath overtone
      const noteOsc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      
      noteOsc.type = 'triangle';
      noteOsc.frequency.setValueAtTime(freq, now);
      // Gentle portamento / glide
      noteOsc.frequency.exponentialRampToValueAtTime(freq * 1.005, now + 0.4);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.12, now + 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

      noteOsc.connect(noteGain);
      noteGain.connect(this.gainMaster);
      noteOsc.start(now);
      noteOsc.stop(now + 0.9);
    }, 700);
  }

  public stopMusic() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.droneOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // ignore
      }
    });
    this.droneOscillators = [];
  }

  public toggleMusic(): boolean {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioManager();
