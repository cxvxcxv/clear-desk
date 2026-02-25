'use client';

import { useEffect, useRef, useState } from 'react';

import {
  COUNTDOWN_THRESHOLD,
  PHASE_SOUND_CONFIG,
  TPomodoroPhase,
  usePomodoroSettings,
} from '@/entities/pomodoro';
import { soundManager } from '@/shared/sound';

export const usePomodoroSound = (
  phase: TPomodoroPhase,
  isRunning: boolean,
  secondsLeft: number,
) => {
  const { volume, isMuted } = usePomodoroSettings();
  const [isReady, setIsReady] = useState(false);

  const prevPhase = useRef<TPomodoroPhase>(phase);
  const prevIsRunning = useRef<boolean>(isRunning);

  // preload all phase transition sounds on mount
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

  // play phase transition sound when timer starts or phase changes
  useEffect(() => {
    if (!isReady || isMuted) return;

    const hasStarted = !prevIsRunning.current && isRunning;
    const hasSwitchedPhase = prevPhase.current !== phase && isRunning;

    if (hasStarted || hasSwitchedPhase) {
      if (soundManager.hasBuffer(phase)) {
        soundManager.play(phase, { volume: volume / 100, interrupt: true });
      } else {
        soundManager.playTone(800, volume / 100);
      }
    }

    prevPhase.current = phase;
    prevIsRunning.current = isRunning;
  }, [phase, isRunning, isReady, isMuted, volume]);

  useEffect(() => {
    if (!isRunning || isMuted) return;

    // warmup
    if (secondsLeft === COUNTDOWN_THRESHOLD + 3) {
      soundManager.stealthWarmup();
    }

    // tick
    if (secondsLeft <= COUNTDOWN_THRESHOLD && secondsLeft > 0)
      soundManager.playTone(400, volume / 100);
  }, [secondsLeft, isRunning, isMuted, volume]);

  // full cleanup on unmount
  useEffect(() => {
    return () => {
      soundManager.stopAll();
    };
  }, []);
};
