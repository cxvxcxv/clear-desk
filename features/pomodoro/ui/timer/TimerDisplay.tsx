import clsx from 'clsx';

import { TPomodoroPhase, formatTime } from '@/entities/pomodoro';
import { CircularProgress } from '@/shared/ui';

type TTimerDisplayProps = {
  remainingSeconds: number;
  totalSeconds: number;
  phase: TPomodoroPhase;
  completedCycles: number;
};

export const TimerDisplay = ({
  remainingSeconds,
  totalSeconds,
  phase,
  completedCycles,
}: TTimerDisplayProps) => {
  const isEnding = remainingSeconds <= 5;
  return (
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
  );
};
