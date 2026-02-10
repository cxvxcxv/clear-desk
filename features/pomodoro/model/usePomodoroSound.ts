import { useEffect, useRef } from 'react';

import { TPomodoroPhase } from '@/entities/pomodoro';
import { soundManager } from '@/shared/sound';

const PHASE_SOUND_CONFIG: Record<
  TPomodoroPhase,
  { file: string; volume: number }
> = {
  work: { file: 'work-start.mp3', volume: 0.8 },
  shortBreak: { file: 'break-start.mp3', volume: 1.0 },
  longBreak: { file: 'long-break-start.mp3', volume: 1.0 },
};

export const usePomodoroSound = (phase: TPomodoroPhase, isRunning: boolean) => {
  const prevPhase = useRef<TPomodoroPhase>(phase);
  const prevIsRunning = useRef<boolean>(isRunning);

  useEffect(() => {
    Object.entries(PHASE_SOUND_CONFIG).forEach(([name, config]) => {
      soundManager.load(name, `/sounds/${config.file}`);
    });

    return () => {
      soundManager.stopAll();
    };
  }, []);

  useEffect(() => {
    const hasStarted = !prevIsRunning.current && isRunning;
    const hasSwitchedPhase = prevPhase.current !== phase && isRunning;

    if (hasStarted || hasSwitchedPhase) {
      soundManager.playTone(800, 0.5);
    }

    prevPhase.current = phase;
    prevIsRunning.current = isRunning;
  }, [phase, isRunning]);
};
