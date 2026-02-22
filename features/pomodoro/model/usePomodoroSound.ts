import { useEffect, useRef, useState } from 'react';

import { TPomodoroPhase, usePomodoroSettings } from '@/entities/pomodoro';
import { soundManager } from '@/shared/sound';

const PHASE_SOUND_CONFIG: Record<TPomodoroPhase, { file: string }> = {
  work: { file: 'work-start.mp3' },
  shortBreak: { file: 'short-break-start.mp3' },
  longBreak: { file: 'long-break-start.mp3' },
};

export const usePomodoroSound = (
  phase: TPomodoroPhase,
  isRunning: boolean,
  secondsLeft: number,
) => {
  const prevPhase = useRef<TPomodoroPhase>(phase);
  const prevIsRunning = useRef<boolean>(isRunning);
  const [isReady, setIsReady] = useState(false);
  const { volume, isMuted } = usePomodoroSettings();

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
    if (!isReady || isMuted) return;

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
          volume: volume / 100,
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
  }, [phase, isRunning, isReady, isMuted, volume]);

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
