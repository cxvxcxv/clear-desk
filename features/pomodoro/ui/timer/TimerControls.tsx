import { ChevronLast, RotateCcw } from 'lucide-react';

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
  return (
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
        onClick={toggleTimer}
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
  );
};
