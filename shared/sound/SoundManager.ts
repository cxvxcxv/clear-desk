export class SoundManager {
  private ctx: AudioContext | null = null; // web audio api base engine
  private masterGain: GainNode | null = null; // global volume controller
  private buffers = new Map<string, AudioBuffer>(); // decoded ready-to-play audio data
  private inFlightLoads = new Map<string, Promise<boolean>>(); // dedupe tracker for active downloads
  private activeSources = new Map<string, Set<AudioBufferSourceNode>>(); // map of categories -> set of active sound instances
  private muted = false; // toggle for master silence
  private volume = 1; // persistent volume level memory

  async init() {
    if (this.ctx) return; // prevent duplicate engine creation
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
        await this.init(); // enusre enigne exists before fetching

        // fetch audio path
        const res = await fetch(url);
        const contentType = res.headers.get('Content-Type');

        // verify the file actually exists and is audio format
        if (!res.ok || !contentType?.includes('audio')) {
          console.warn(`SoundManager: Resource ${url} not found or not audio.`);
          return false;
        }

        const arr = await res.arrayBuffer(); // get raw binary data
        const buf = await this.ctx!.decodeAudioData(arr); // uncompress
        this.buffers.set(name, buf); // store in ram for instant playback
        return true;
      } catch (e) {
        console.error('SoundManager.load error', e);
        return false;
      } finally {
        this.inFlightLoads.delete(name); // erase loaded audio from tracker
      }
    })();

    this.inFlightLoads.set(name, promise); // write to tracker
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

    // wake up the audio clock if the browser put it to sleep
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

    // 'spam control': if true, kill all older instances of this sound before starting new one
    if (interrupt) this.stop(name);

    const src = this.ctx.createBufferSource();
    src.buffer = buf;

    // create local volume special for the targeted sound
    const localGain = this.ctx.createGain();
    localGain.gain.value = typeof volume === 'number' ? volume : 1;

    // connect the local gain to master gain
    src.connect(localGain);
    localGain.connect(this.masterGain);

    // add set to active sources map if does not exist
    let set = this.activeSources.get(name);
    if (!set) {
      set = new Set();
      this.activeSources.set(name, set);
    }
    set.add(src);

    return new Promise<boolean>(resolve => {
      const cleanup = () => {
        try {
          set.delete(src);
          localGain.disconnect(); // unplug virtual wires to prevent memory leaks
        } catch (e) {
          console.error('SoundManager.play cleanup error', e);
        }
      };

      // triggered automatically when audio finishes or src.stop() is called
      src.onended = () => {
        cleanup();
        if (set && set.size === 0) this.activeSources.delete(name); // delete category if empty
        resolve(true);
      };

      // play the audio
      try {
        src.start(this.ctx!.currentTime + when);
      } catch (e) {
        console.error('SoundManager.play start error', e);
        cleanup();
        resolve(false);
      }
    });
  }

  // stop all active instances of a specific sound by name
  stop(name: string) {
    // retrieve the set containing all active 'record player' nodes for this sound
    const set = this.activeSources.get(name);
    if (!set) return;

    // create a static array copy to safely loop through each element
    for (const src of Array.from(set)) {
      try {
        src.stop(); // immediately cease audio playback (this also triggers src.onended)
      } catch (e) {
        console.error(e);
      }
      set.delete(src); // remove the specific node from the tracking set
    }
    this.activeSources.delete(name); // remove the sound category from the map entirely now that it is empty
  }

  // iterate through every category in the map and thrigger their individual stop logic
  stopAll() {
    for (const name of Array.from(this.activeSources.keys())) {
      this.stop(name);
    }
  }

  // remove a specific sound from memory
  unload(name: string) {
    this.stop(name);
    this.buffers.delete(name); // free up the ram used by the decoded audio
  }

  // completely shut down the audio engine
  async dispose() {
    try {
      this.stopAll();
      this.buffers.clear(); // remove everything from sound buffer array
      if (this.ctx) {
        try {
          await this.ctx.close(); // physically release audio hardware back to the os
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

  // synthesizes a sound using oscillator (for fallbacks)
  async playTone(freq: number, dur = 0.25) {
    await this.init();

    if (this.muted || !this.ctx || !this.masterGain) return;

    // wake up the audio clock if the browser put it to sleep
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

    // exponential ramps: prevents harsh speaker 'pops' and sounds more natural to human ears
    g.gain.setValueAtTime(0.001, now); // start at almost 0 volume now
    g.gain.exponentialRampToValueAtTime(0.5, now + 0.01); // slide up the volume to 50% over the next 0.01 sec
    g.gain.exponentialRampToValueAtTime(0.001, now + dur); // slide back the volume to almost 0 over the tone duration

    osc.start(now);
    osc.stop(now + dur + 0.02); // stop oscillator slightly after the volume hits zero to ensure fade-out effect
  }

  setMuted(v: boolean) {
    this.muted = v;
    if (this.masterGain) {
      this.masterGain.gain.value = v ? 0 : this.volume;
    }
  }

  // volume value logic
  setVolume(value: number) {
    this.volume = Math.max(0, Math.min(1, value)); // clamp value between 0 and 1
    if (!this.muted && this.masterGain) {
      this.masterGain.gain.value = this.volume;
    }
  }

  getLoadedNames(): string[] {
    return Array.from(this.buffers.keys()); // convert map keys into a standard array
  }

  hasBuffer(name: string): boolean {
    return this.buffers.has(name);
  }
}
