import { TPomodoroPhase } from './types';

export const PHASE_SOUND_CONFIG: Record<TPomodoroPhase, { file: string }> = {
  work: { file: 'work-start.mp3' },
  shortBreak: { file: 'short-break-start.mp3' },
  longBreak: { file: 'long-break-start.mp3' },
};

export const COUNTDOWN_THRESHOLD = 10;
