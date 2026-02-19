'use client';

import { useEffect, useReducer, useRef } from 'react';

import { minutesToSeconds } from '../lib';

import { usePomodoroSettings } from './store';
import { IPomodoroSettings, IPomodoroState, TPomodoroPhase } from './types';

type TAction =
  | { type: 'NEXT_PHASE'; settings: IPomodoroSettings }
  | { type: 'TOGGLE' }
  | { type: 'RESET'; settings: IPomodoroSettings }
  | { type: 'SYNC_TIME'; remainingSeconds: number };

// reducer

function reducer(state: IPomodoroState, action: TAction): IPomodoroState {
  switch (action.type) {
    case 'TOGGLE':
      return { ...state, isRunning: !state.isRunning };

    case 'RESET':
      return {
        phase: 'work',
        remainingSeconds: minutesToSeconds(action.settings.workMinutes),
        isRunning: false,
        completedCycles: 0,
      };

    case 'SYNC_TIME':
      return { ...state, remainingSeconds: action.remainingSeconds };

    case 'NEXT_PHASE': {
      const isWorkEnding = state.phase === 'work';
      const newCycles = isWorkEnding
        ? state.completedCycles + 1
        : state.completedCycles;

      const isLongBreak =
        isWorkEnding && newCycles % action.settings.cyclesBeforeLongBreak === 0;

      const nextPhase: TPomodoroPhase = isWorkEnding
        ? isLongBreak
          ? 'longBreak'
          : 'shortBreak'
        : 'work';

      const durations = {
        work: action.settings.workMinutes,
        shortBreak: action.settings.shortBreakMinutes,
        longBreak: action.settings.longBreakMinutes,
      };

      return {
        ...state,
        phase: nextPhase,
        completedCycles: newCycles,
        remainingSeconds: minutesToSeconds(durations[nextPhase]),
      };
    }

    default:
      return state;
  }
}

// hook
export const usePomodoro = () => {
  const settings = usePomodoroSettings();

  const [state, dispatch] = useReducer(reducer, {
    phase: 'work',
    remainingSeconds: minutesToSeconds(settings.workMinutes),
    isRunning: false,
    completedCycles: 0,
  });

  const settingsRef = useRef(settings);
  const stateRef = useRef(state);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Update remaining seconds when settings change (only if timer is paused)
  useEffect(() => {
    if (state.isRunning) return;

    const newDuration = minutesToSeconds(
      state.phase === 'work'
        ? settings.workMinutes
        : state.phase === 'shortBreak'
          ? settings.shortBreakMinutes
          : settings.longBreakMinutes,
    );

    dispatch({ type: 'SYNC_TIME', remainingSeconds: newDuration });
  }, [settings, state.phase, state.isRunning]);

  useEffect(() => {
    if (!state.isRunning) return;

    const startTime = Date.now();
    const secondsAtStart = stateRef.current.remainingSeconds;

    const interval = setInterval(() => {
      const elapsedMs = Date.now() - startTime;
      const elapsedSec = Math.floor(elapsedMs / 1000);
      const newRemaining = Math.max(0, secondsAtStart - elapsedSec);

      if (newRemaining > 0) {
        dispatch({ type: 'SYNC_TIME', remainingSeconds: newRemaining });
      } else {
        dispatch({ type: 'NEXT_PHASE', settings: settingsRef.current });
      }
    }, 200); // synchronizing time every 200ms

    return () => clearInterval(interval);
  }, [state.isRunning, state.phase]);

  return {
    ...state,
    totalSeconds: minutesToSeconds(
      state.phase === 'work'
        ? settings.workMinutes
        : state.phase === 'shortBreak'
          ? settings.shortBreakMinutes
          : settings.longBreakMinutes,
    ),
    toggleTimer: () => dispatch({ type: 'TOGGLE' }),
    resetTimer: () => dispatch({ type: 'RESET', settings: settings }),
    skipCycle: () => dispatch({ type: 'NEXT_PHASE', settings: settings }),
  };
};
