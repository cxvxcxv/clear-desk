export type TPomodoroPhase = 'work' | 'shortBreak' | 'longBreak';

export type TPomodoroState = {
  phase: TPomodoroPhase;
  remainingSeconds: number;
  isRunning: boolean;
  completedCycles: number;
};

export type TPomodoroConfig = {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  cyclesBeforeLongBreak: number;
};
