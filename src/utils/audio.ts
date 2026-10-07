/**
 * Web Audio API synthesizer for interactive audio cues and anthem melody
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public playTone(freq: number, duration: number, type: OscillatorType = 'sine', gainVal: number = 0.15) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before gesture
    }
  }

  public playSuccess() {
    if (this.isMuted) return;
    this.initCtx();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.25, 'triangle', 0.12);
      }, idx * 70);
    });
  }

  public playWarning() {
    if (this.isMuted) return;
    this.initCtx();
    this.playTone(320, 0.15, 'sawtooth', 0.08);
    setTimeout(() => {
      this.playTone(280, 0.25, 'sawtooth', 0.08);
    }, 120);
  }

  public playFanfare() {
    if (this.isMuted) return;
    this.initCtx();
    const notes = [
      { f: 523.25, d: 0.15, t: 0 },
      { f: 659.25, d: 0.15, t: 150 },
      { f: 783.99, d: 0.15, t: 300 },
      { f: 1046.5, d: 0.45, t: 450 },
      { f: 880.0, d: 0.2, t: 750 },
      { f: 1046.5, d: 0.6, t: 950 },
    ];
    notes.forEach((n) => {
      setTimeout(() => {
        this.playTone(n.f, n.d, 'triangle', 0.15);
      }, n.t);
    });
  }

  public playAnthemMotif() {
    if (this.isMuted) return;
    this.initCtx();
    // SENA anthem opening phrase ("Estudiantes del SENA adelante...")
    const anthemNotes = [
      { f: 392.00, d: 0.35, delay: 0 },    // G4 (Es-)
      { f: 392.00, d: 0.25, delay: 350 },  // G4 (-tu-)
      { f: 440.00, d: 0.30, delay: 600 },  // A4 (-dian-)
      { f: 493.88, d: 0.45, delay: 900 },  // B4 (-tes)
      { f: 523.25, d: 0.35, delay: 1350 }, // C5 (del)
      { f: 587.33, d: 0.60, delay: 1700 }, // D5 (SE-)
      { f: 523.25, d: 0.70, delay: 2300 }, // C5 (-NA)
      { f: 493.88, d: 0.45, delay: 3000 }, // B4 (a-)
      { f: 440.00, d: 0.45, delay: 3450 }, // A4 (-de-)
      { f: 392.00, d: 0.80, delay: 3900 }, // G4 (-lan-)
      { f: 392.00, d: 0.90, delay: 4700 }, // G4 (-te)
    ];

    anthemNotes.forEach((n) => {
      setTimeout(() => {
        this.playTone(n.f, n.d, 'sine', 0.18);
      }, n.delay);
    });
  }
}

export const sound = new SoundEngine();
