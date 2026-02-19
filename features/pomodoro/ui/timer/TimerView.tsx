import { Settings } from 'lucide-react';

import { usePomodoroSound } from '../../model';

import { TimerControls } from './TimerControls';
import { TimerDisplay } from './TimerDisplay';
import { usePomodoro } from '@/entities/pomodoro';

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

  usePomodoroSound(phase, isRunning, remainingSeconds);

  // todo: a11y, micro-interactions, responsiveness, i18n
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-8">
      <div className="absolute top-0 right-0 flex flex-col gap-2">
        <button
          aria-label="settings"
          className="border-border flex items-center justify-center rounded-full border-2 p-1"
          onClick={openSettings}
        >
          <Settings strokeWidth={1.25} className="h-6 w-6" />
        </button>
      </div>

      <TimerDisplay
        remainingSeconds={remainingSeconds}
        totalSeconds={totalSeconds}
        phase={phase}
        completedCycles={completedCycles}
      />

      <TimerControls
        isRunning={isRunning}
        resetTimer={resetTimer}
        toggleTimer={toggleTimer}
        skipCycle={skipCycle}
      />
    </div>
  );
};
