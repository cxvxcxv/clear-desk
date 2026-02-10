import clsx from 'clsx';
import { ChevronLast, RotateCcw, Settings } from 'lucide-react';

import { usePomodoroSound } from '../model';

import { formatTime, usePomodoro } from '@/entities/pomodoro';
import { soundManager } from '@/shared/sound';
import { CircularProgress } from '@/shared/ui';

type TTimerViewProps = {
  openSettings: () => void;
};

export const TimerView = ({ openSettings }: TTimerViewProps) => {
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

  usePomodoroSound(phase, isRunning);

  const isEnding = remainingSeconds <= 5;

  const handleToggle = async () => {
    if (!isRunning) {
      await soundManager.init(); // Unlocks Web Audio on user gesture
    }
    toggleTimer();
  };

  // todo: a11y, micro-interactions, responsiveness, i18n
  return (
    <div className="relative flex flex-col items-center justify-center gap-4">
      <div className="absolute top-0 right-0 flex flex-col gap-2">
        <button
          aria-label="settings"
          className="border-border flex items-center justify-center rounded-full border-2 p-1"
          onClick={openSettings}
        >
          <Settings strokeWidth={1.25} className="h-6 w-6" />
        </button>
      </div>
      <div className="relative">
        <CircularProgress
          value={remainingSeconds / totalSeconds}
          size={180}
          className={clsx(
            'text-primary rounded-full shadow',
            isEnding && 'animate-pulse',
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
          aria-label="reset timer"
          className="border-border flex h-8 w-8 items-center justify-center rounded-full border-2"
          onClick={resetTimer}
        >
          <RotateCcw strokeWidth={1.5} className="h-4.5 w-4.5" />
        </button>
        <button
          aria-label={isRunning ? 'pause timer' : 'start timer'}
          onClick={handleToggle}
          className="bg-primary/15 rounded-full px-12 py-2 transition-transform hover:scale-105 active:scale-95"
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          aria-label="skip cycle"
          onClick={skipCycle}
          className="border-border flex h-8 w-8 items-center justify-center rounded-full border-2"
        >
          <ChevronLast strokeWidth={1.5} className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
