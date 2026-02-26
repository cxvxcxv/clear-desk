import { IPomodoroSoundPack, TPomodoroSoundPackId } from './types';

export const POMODORO_SOUND_PACKS: Record<
  TPomodoroSoundPackId,
  IPomodoroSoundPack
> = {
  minimal: {
    id: 'minimal',
    name: 'Modern Minimal',
    phases: {
      work: 'work-start.mp3',
      shortBreak: 'break-short-minimal.mp3',
      longBreak: 'break-long-minimal.mp3',
    },
    tickFreq: 400,
  },

  nature: {
    id: 'nature',
    name: 'Forest Morning',
    phases: {
      work: 'birds-chirp.mp3',
      shortBreak: 'stream-flow.mp3',
      longBreak: 'wind-chimes.mp3',
    },
    tickFreq: 400,
  },

  retro: {
    id: 'nature',
    name: 'Forest Morning',
    phases: {
      work: 'birds-chirp.mp3',
      shortBreak: 'stream-flow.mp3',
      longBreak: 'wind-chimes.mp3',
    },
    tickFreq: 400,
  },
};

export const COUNTDOWN_THRESHOLD = 10;
