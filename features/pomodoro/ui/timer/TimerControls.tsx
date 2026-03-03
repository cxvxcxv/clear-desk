import clsx from 'clsx';
import { ChevronLast, Pause, Play, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

type TTimerControlsProps = {
  isRunning: boolean;
  resetTimer: () => void;
  toggleTimer: () => void;
  skipCycle: () => void;
};

export const TimerControls = ({
  isRunning,
  resetTimer,
  toggleTimer,
  skipCycle,
}: TTimerControlsProps) => {
  const t = useTranslations();

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <button
        aria-label={t('aria.resetTimer')}
        title={t('pomodoro.controls.reset')}
        className="border-border flex h-8 w-8 items-center justify-center rounded-full border-2"
        onClick={resetTimer}
      >
        <RotateCcw strokeWidth={1.5} className="h-4.5 w-4.5" />
      </button>
      <button
        aria-label={t('aria.toggleTimer', {
          state: isRunning
            ? t('pomodoro.controls.pause')
            : t('pomodoro.controls.start'),
        })}
        aria-pressed={isRunning}
        onClick={toggleTimer}
        title={
          isRunning
            ? t('pomodoro.controls.pause')
            : t('pomodoro.controls.start')
        }
        className={clsx(
          'flex items-center gap-2 rounded-full px-12 py-2 text-white transition-all hover:scale-105 active:scale-95',
          isRunning ? 'bg-primary/15' : 'bg-primary',
        )}
      >
        {isRunning ? (
          <Pause className="h-5 w-5 fill-current" strokeWidth={1.5} />
        ) : (
          <Play className="ml-1 h-5 w-5 fill-current" strokeWidth={1.5} />
        )}
      </button>
      <button
        aria-label={t('aria.skipCycle')}
        onClick={skipCycle}
        title={t('pomodoro.controls.skip')}
        className="border-border flex h-8 w-8 items-center justify-center rounded-full border-2"
      >
        <ChevronLast strokeWidth={1.5} className="h-5 w-5" />
      </button>
    </div>
  );
};
