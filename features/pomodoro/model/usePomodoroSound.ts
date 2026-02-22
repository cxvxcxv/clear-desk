'use client';

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
  const { volume, isMuted } = usePomodoroSettings();
  const [isReady, setIsReady] = useState(false);

  const prevPhase = useRef<TPomodoroPhase>(phase);
  const prevIsRunning = useRef<boolean>(isRunning);

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

  useEffect(() => {
    if (!isReady || isMuted) return;

    const hasStarted = !prevIsRunning.current && isRunning;
    const hasSwitchedPhase = prevPhase.current !== phase && isRunning;

    if (hasStarted || hasSwitchedPhase) {
      if (soundManager.hasBuffer(phase)) {
        soundManager.play(phase, {
          volume: volume / 100,
          interrupt: true,
        });
      } else {
        soundManager.playTone(800);
      }
    }

    prevPhase.current = phase;
    prevIsRunning.current = isRunning;
  }, [phase, isRunning, isReady, isMuted, volume]);

  useEffect(() => {
    const isEnding = secondsLeft <= 10 && secondsLeft > 0;

    if (isReady && isRunning && isEnding && !isMuted) {
      soundManager.playTone(500, 0.1);
    }
  }, [secondsLeft, isRunning, isReady, isMuted]);

  useEffect(() => {
    return () => soundManager.stopAll();
  }, []);
};
