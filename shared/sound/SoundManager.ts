export class SoundManager {
  private ctx: AudioContext | null = null; // web audio api base object
  private masterGain: GainNode | null = null; // master volume slider
  private buffers = new Map<string, AudioBuffer>(); // raw audio data
  private inFlightLoads = new Map<string, Promise<boolean>>(); // loading audios progress tracker
  private activeSources = new Map<string, Set<AudioBufferSourceNode>>(); // track playing sounds
  private muted = false; // switch for all audios
  private volume = 1; // value to track before mute

  async init() {
    if (this.ctx) return; // prevent creating multiple contexts
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.connect(this.ctx.destination); // connect to output device
    this.masterGain.gain.value = 1;
    this.attachResumeOnGesture();
  }

  // autoplay policy workaround
  private attachResumeOnGesture() {
    const resume = async () => {
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') await this.ctx.resume();
      window.removeEventListener('pointerdown', resume);
    };
    window.addEventListener('pointerdown', resume, { once: true }); // delete listener after triggered once
  }

  async load(name: string, url: string): Promise<boolean> {
    // prevent downloading the same audio multiple times
    const existing = this.inFlightLoads.get(name);
    if (existing) return existing;

    const promise = (async () => {
      try {
        await this.init();

        // fetch audio path
        const res = await fetch(url);
        const contentType = res.headers.get('Content-Type');

        // validate response
        if (!res.ok || !contentType?.includes('audio')) {
          console.warn(`SoundManager: Resource ${url} not found or not audio.`);
          return false;
        }

        const arr = await res.arrayBuffer(); // extract array buffer
        const buf = await this.ctx!.decodeAudioData(arr); // decode array buffer
        this.buffers.set(name, buf); // save to buffers map
        return true;
      } catch (e) {
        console.error('SoundManager.load error', e);
        return false;
      } finally {
        this.inFlightLoads.delete(name); // erase loaded audio from tracker
      }
    })();

    this.inFlightLoads.set(name, promise);
    return promise;
  }

  async play(
    name: string,
    options?: { when?: number; interrupt?: boolean; volume?: number },
  ): Promise<boolean> {
    const when = options?.when ?? 0;
    const interrupt = options?.interrupt ?? true;
    const volume = options?.volume;

    await this.init();

    if (!this.ctx || !this.masterGain) return false;

    // autoplay wake up
    try {
      if (this.ctx.state === 'suspended') await this.ctx.resume();
    } catch (e) {
      console.error('SoundManager.play resume error', e);
    }

    if (this.muted) return false;

    // get targeted audio's buffer
    const buf = this.buffers.get(name);
    if (!buf) {
      console.warn(`SoundManager.play: buffer not found for "${name}"`);
      return false;
    }

    // spam control (i.e. kill the copy of this sound currently playing)
    if (interrupt) this.stop(name);

    const src = this.ctx.createBufferSource();
    src.buffer = buf;

    // create local volume special for the targeted sound
    const localGain = this.ctx.createGain();
    localGain.gain.value = typeof volume === 'number' ? volume : 1;

    src.connect(localGain);
    localGain.connect(this.masterGain);

    let set = this.activeSources.get(name);
    if (!set) {
      set = new Set();
      this.activeSources.set(name, set);
    }
    set.add(src);

    return new Promise<boolean>(resolve => {
      const cleanup = () => {
        try {
          set!.delete(src);
          localGain.disconnect();
        } catch (e) {
          console.error(e);
        }
      };

      src.onended = () => {
        cleanup();
        if (set && set.size === 0) this.activeSources.delete(name);
        resolve(true);
      };

      try {
        src.start(this.ctx!.currentTime + when);
      } catch (e) {
        console.error('SoundManager.play start error', e);
        cleanup();
        resolve(false);
      }
    });
  }

  stop(name: string) {
    const set = this.activeSources.get(name);
    if (!set) return;
    for (const src of Array.from(set)) {
      try {
        src.stop();
      } catch (e) {
        console.error(e);
      }
      set.delete(src);
    }
    this.activeSources.delete(name);
  }

  stopAll() {
    for (const name of Array.from(this.activeSources.keys())) {
      this.stop(name);
    }
  }

  unload(name: string) {
    this.stop(name);
    this.buffers.delete(name);
  }

  async dispose() {
    try {
      this.stopAll();
      this.buffers.clear();
      if (this.ctx) {
        try {
          await this.ctx.close();
        } catch (e) {
          console.log(e);
        }
      }
    } finally {
      this.ctx = null;
      this.masterGain = null;
      this.activeSources.clear();
    }
  }

  async playTone(freq: number, dur = 0.25) {
    await this.init();

    if (this.muted || !this.ctx || !this.masterGain) return;

    try {
      if (this.ctx.state === 'suspended') await this.ctx.resume();
    } catch (e) {
      console.error('SoundManager.playTone resume error', e);
    }

    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();

    osc.frequency.value = freq;
    g.gain.value = 0.001;

    osc.connect(g);
    g.connect(this.masterGain);

    const now = this.ctx.currentTime;

    g.gain.setValueAtTime(0.001, now);
    g.gain.exponentialRampToValueAtTime(0.5, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);

    osc.start(now);
    osc.stop(now + dur + 0.02);
  }

  setMuted(v: boolean) {
    this.muted = v;
    if (this.masterGain) {
      this.masterGain.gain.value = v ? 0 : this.volume;
    }
  }

  setVolume(value: number) {
    this.volume = Math.max(0, Math.min(1, value));
    if (!this.muted && this.masterGain) {
      this.masterGain.gain.value = this.volume;
    }
  }

  getLoadedNames(): string[] {
    return Array.from(this.buffers.keys());
  }

  hasBuffer(name: string): boolean {
    return this.buffers.has(name);
  }
}
