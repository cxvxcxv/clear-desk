export class SoundManager {
  private ctx: AudioContext | null = null;
  private gain: GainNode | null = null;
  private buffers = new Map<string, AudioBuffer>();
  private muted = false;

  async init() {
    if (this.ctx) return;
    this.ctx = new AudioContext();
    this.gain = this.ctx.createGain();
    this.gain.connect(this.ctx.destination);
    this.gain.gain.value = 1;
    this.attachResumeOnGesture();
  }

  private attachResumeOnGesture() {
    const resume = async () => {
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') await this.ctx.resume();
      window.removeEventListener('pointerdown', resume);
    };
    window.addEventListener('pointerdown', resume, { once: true });
  }

  async load(name: string, url: string) {
    await this.init();
    const res = await fetch(url);
    const arr = await res.arrayBuffer();
    const buf = await this.ctx!.decodeAudioData(arr);
    this.buffers.set(name, buf);
  }

  play(name: string, when = 0) {
    if (this.muted) return;
    if (!this.ctx) return;
    const buf = this.buffers.get(name);
    if (!buf) return;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    src.connect(this.gain!);
    src.start(this.ctx.currentTime + when);
  }

  playTone(freq: number, dur = 0.25) {
    if (this.muted) return;
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.frequency.value = freq;
    g.gain.value = 0.001;
    osc.connect(g);
    g.connect(this.gain!);
    const now = this.ctx.currentTime;
    g.gain.setValueAtTime(0.001, now);
    g.gain.exponentialRampToValueAtTime(0.5, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);
    osc.start(now);
    osc.stop(now + dur + 0.02);
  }

  setMuted(v: boolean) {
    this.muted = v;
    if (this.gain) this.gain.gain.value = v ? 0 : 1;
  }
}
