import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import {
  COUNTDOWN_THRESHOLD,
  TPomodoroPhase,
  formatTime,
} from '@/entities/pomodoro';
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
  const isEnding = remainingSeconds <= COUNTDOWN_THRESHOLD;
  const formattedTime = formatTime(remainingSeconds);

  const t = useTranslations();
  return (
    <div
      role="timer"
      aria-live="polite"
      aria-atomic
      aria-label={t('aria.timerStatus', {
        phase: t(`pomodoro.durations.${phase}`),
        time: formattedTime,
      })}
      className="relative my-auto"
    >
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
            {t('pomodoro.display.cycle')} {completedCycles + 1}
          </span>
        )}

        <span className="font-mono text-4xl tabular-nums">{formattedTime}</span>

        <span className="text-muted text-sm tracking-widest uppercase">
          {phase}
        </span>
      </div>
    </div>
  );
};
