'use client';

import { formatTime } from '../lib';
import { usePomodoro } from '../model';

import { CircularProgress } from '@/shared/ui';

export const PomodoroWidget = () => {
  const {
    phase,
    remainingSeconds,
    totalSeconds,
    isRunning,
    completedCycles,
    toggleTimer,
    skipCycle,
    resetTimer,
  } = usePomodoro();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="relative">
        <CircularProgress
          value={remainingSeconds / totalSeconds}
          size={180}
          className="text-primary"
        />

        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-1 text-center">
          {phase === 'work' && (
            <span className="text-muted text-xs">
              cycle {completedCycles + 1}
            </span>
          )}

          <span className="font-mono text-3xl">
            {formatTime(remainingSeconds)}
          </span>

          <span className="text-muted text-sm tracking-widest uppercase">
            {phase}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={skipCycle}>Skip</button>
      </div>
    </div>
  );
};
