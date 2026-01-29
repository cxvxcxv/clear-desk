'use client';

import { formatTime } from '../lib';
import { usePomodoro } from '../model';

export const PomodoroWidget = () => {
  const {
    phase,
    remainingSeconds,
    isRunning,
    completedCycles,
    toggleTimer,
    resetTimer,
  } = usePomodoro();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <span className="text-muted-foreground text-sm tracking-wide uppercase">
        {phase}
      </span>

      <span className="font-mono text-3xl">{formatTime(remainingSeconds)}</span>
      <span>{completedCycles}</span>

      <div className="flex gap-2">
        <button onClick={toggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer}>Reset</button>
        {/* <button onClick={skip}>Skip</button> */}
      </div>
    </div>
  );
};
