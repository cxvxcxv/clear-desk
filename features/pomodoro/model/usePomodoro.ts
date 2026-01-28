import { useCallback, useEffect, useRef, useState } from 'react';

import { TPomodoroConfig, TPomodoroPhase } from '@/entities/pomodoro';

const toSeconds = (minutes: number) => Math.round(minutes * 60);

const DEFAULT_CONFIG: TPomodoroConfig = {
  workMinutes: 0.1,
  shortBreakMinutes: 0.1,
  longBreakMinutes: 0.1,
  cyclesBeforeLongBreak: 4,
};

export const usePomodoro = (config: TPomodoroConfig = DEFAULT_CONFIG) => {
  const {
    workMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    cyclesBeforeLongBreak,
  } = config;

  const [phase, setPhase] = useState<TPomodoroPhase>('work');
  const [remainingSeconds, setRemainingSeconds] = useState(
    toSeconds(workMinutes),
  );
  const [isRunning, setIsRunning] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handlePhaseEnd = useCallback(() => {
    setPhase(currentPhase => {
      if (currentPhase === 'work') {
        const nextCycleCount = completedCycles + 1;
        setCompletedCycles(nextCycleCount);

        if (nextCycleCount % cyclesBeforeLongBreak === 0) {
          setRemainingSeconds(toSeconds(longBreakMinutes));
          return 'longBreak';
        }
        setRemainingSeconds(toSeconds(shortBreakMinutes));
        return 'shortBreak';
      } else {
        setRemainingSeconds(toSeconds(workMinutes));
        return 'work';
      }
    });
  }, [
    completedCycles,
    cyclesBeforeLongBreak,
    workMinutes,
    shortBreakMinutes,
    longBreakMinutes,
  ]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setRemainingSeconds(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handlePhaseEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, handlePhaseEnd]);

  const toggleTimer = () => setIsRunning(prev => !prev);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setPhase('work');
    setRemainingSeconds(toSeconds(workMinutes));
    setCompletedCycles(0);
  };

  return {
    phase,
    remainingSeconds,
    isRunning,
    completedCycles,
    toggleTimer,
    resetTimer,
  };
};
