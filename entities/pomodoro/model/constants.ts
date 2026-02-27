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
      shortBreak: 'short-break-start.mp3',
      longBreak: 'long-break-start.mp3',
    },
    tickFreq: 880,
  },

  nature: {
    id: 'nature',
    name: 'Forest Nature',
    phases: {
      work: 'work-start.mp3',
      shortBreak: 'short-break-start.mp3',
      longBreak: 'long-break-start.mp3',
    },
    tickFreq: 440,
  },

  retro: {
    id: 'retro',
    name: 'Retro Waves',
    phases: {
      work: 'work-start.mp3',
      shortBreak: 'short-break-start.mp3',
      longBreak: 'long-break-start.mp3',
    },
    tickFreq: 220,
  },
};

export const COUNTDOWN_THRESHOLD = 10;
