'use client';

import clsx from 'clsx';
import { ChevronLast, RotateCcw, Settings } from 'lucide-react';

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

  const isEnding = remainingSeconds <= 5;

  // todo: a11y, micro-interactions, responsiveness

  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4">
      <div className="absolute top-0 right-0 flex flex-col gap-2">
        <button
          className={clsx('border-border h-8 w-8 rounded-full border-2 p-1')}
        >
          <Settings strokeWidth={1.25} className="h-full w-full" />
        </button>
      </div>
      <div className="relative">
        <CircularProgress
          value={remainingSeconds / totalSeconds}
          size={180}
          className={clsx(
            'text-primary rounded-full shadow',
            isEnding && 'scale-105 animate-pulse',
          )}
        />

        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-1 text-center">
          {phase === 'work' && (
            <span className="text-muted text-xs">
              cycle {completedCycles + 1}
            </span>
          )}

          <span className="font-mono text-4xl tabular-nums">
            {formatTime(remainingSeconds)}
          </span>

          <span className="text-muted text-sm tracking-widest uppercase">
            {phase}
          </span>
        </div>
      </div>

      <div className="flex w-full items-center justify-between gap-2">
        <button
          className="border-border h-8 w-8 rounded-full border-2 p-1.5"
          onClick={resetTimer}
        >
          <RotateCcw strokeWidth={1.5} className="h-full w-full" />
        </button>
        <button
          onClick={toggleTimer}
          className="bg-primary/15 rounded-full px-12 py-2 transition-transform hover:scale-105 active:scale-95"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={skipCycle}
          className="border-border h-8 w-8 rounded-full border-2 p-1 transition-transform hover:translate-x-0.5"
        >
          <ChevronLast strokeWidth={1.5} className="h-full w-full" />
        </button>
      </div>
    </div>
  );
};
