export type TPomodoroPhase = 'work' | 'shortBreak' | 'longBreak';

export interface IPomodoroState {
  phase: TPomodoroPhase;
  remainingSeconds: number;
  isRunning: boolean;
  completedCycles: number;
}

export type TDetailView =
  | 'work'
  | 'shortBreak'
  | 'longBreak'
  | 'cyclesBeforeLongBreak';

export interface IPomodoroSettings {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  cyclesBeforeLongBreak: number;
  isMuted: boolean;
  volume: number;
  soundPack: 'default';
}
