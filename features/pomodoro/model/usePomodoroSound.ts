import { useEffect, useRef, useState } from 'react';

import { TPomodoroPhase } from '@/entities/pomodoro';
import { soundManager } from '@/shared/sound';

const PHASE_SOUND_CONFIG: Record<
  TPomodoroPhase,
  { file: string; volume: number }
> = {
  work: { file: 'work-start.mp3', volume: 0.8 },
  shortBreak: { file: 'short-break-start.mp3', volume: 1.0 },
  longBreak: { file: 'long-break-start.mp3', volume: 1.0 },
};

export const usePomodoroSound = (
  phase: TPomodoroPhase,
  isRunning: boolean,
  secondsLeft: number,
) => {
  const prevPhase = useRef<TPomodoroPhase>(phase);
  const prevIsRunning = useRef<boolean>(isRunning);
  const [isReady, setIsReady] = useState(false);

  // preload sounds on mount
  useEffect(() => {
    let mounted = true;

    const preload = async () => {
      const loadPromises = Object.entries(PHASE_SOUND_CONFIG).map(
        ([name, config]) => soundManager.load(name, `/sounds/${config.file}`),
      );

      await Promise.all(loadPromises);
      if (mounted) setIsReady(true);
    };

    preload();
    return () => {
      mounted = false;
    };
  }, []);

  // handle sound triggers based on state changes
  useEffect(() => {
    if (!isReady) return;

    /* 
      play a sound ONLY if:
      a) the timer just started (Running changed from false -> true)
      b) the phase just changed while the timer was ALREADY running
     */
    const hasStarted = !prevIsRunning.current && isRunning;
    const hasSwitchedPhase = prevPhase.current !== phase && isRunning;

    if (hasStarted || hasSwitchedPhase) {
      if (soundManager.hasBuffer(phase)) {
        soundManager.play(phase, {
          volume: PHASE_SOUND_CONFIG[phase].volume,
          interrupt: true, // stop any previous phase sound immediately
        });
      } else {
        // fallback
        soundManager.playTone(800, 0.5);
      }
    }

    // update refs AFTER the logic so they are ready for the NEXT render
    prevPhase.current = phase;
    prevIsRunning.current = isRunning;
  }, [phase, isRunning, isReady]);

  // stop all sounds if this specific hook/component unmounts
  useEffect(() => {
    return () => {
      soundManager.stopAll();
    };
  }, []);

  useEffect(() => {
    // only tick if the timer is running, the engine is ready
    const shouldTick =
      isReady && isRunning && secondsLeft <= 10 && secondsLeft > 0;

    if (shouldTick) soundManager.playTone(500);
  }, [secondsLeft, isRunning, isReady]);
};
