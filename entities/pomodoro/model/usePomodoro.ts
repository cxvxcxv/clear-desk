'use client';

import { useEffect, useReducer, useRef } from 'react';

import { minutesToSeconds } from '../lib';

import { TPomodoroConfig, TPomodoroPhase, TPomodoroState } from './types';

const DEFAULT_CONFIG: TPomodoroConfig = {
  workMinutes: 25,
  shortBreakMinutes: 0.1,
  longBreakMinutes: 0.1,
  cyclesBeforeLongBreak: 4,
};

type TAction =
  | { type: 'NEXT_PHASE'; config: TPomodoroConfig }
  | { type: 'TOGGLE' }
  | { type: 'RESET'; config: TPomodoroConfig }
  | { type: 'SYNC_TIME'; remainingSeconds: number };

// reducer

function reducer(state: TPomodoroState, action: TAction): TPomodoroState {
  switch (action.type) {
    case 'TOGGLE':
      return { ...state, isRunning: !state.isRunning };

    case 'RESET':
      return {
        phase: 'work',
        remainingSeconds: minutesToSeconds(action.config.workMinutes),
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
        isWorkEnding && newCycles % action.config.cyclesBeforeLongBreak === 0;

      const nextPhase: TPomodoroPhase = isWorkEnding
        ? isLongBreak
          ? 'longBreak'
          : 'shortBreak'
        : 'work';

      const durations = {
        work: action.config.workMinutes,
        shortBreak: action.config.shortBreakMinutes,
        longBreak: action.config.longBreakMinutes,
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

export const usePomodoro = (config: TPomodoroConfig = DEFAULT_CONFIG) => {
  const [state, dispatch] = useReducer(reducer, {
    phase: 'work',
    remainingSeconds: minutesToSeconds(config.workMinutes),
    isRunning: false,
    completedCycles: 0,
  });

  const configRef = useRef(config);
  const stateRef = useRef(state);

  useEffect(() => {
    configRef.current = config;
  }, [config]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

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
        dispatch({ type: 'NEXT_PHASE', config: configRef.current });
      }
    }, 200); // synchronizing time every 200ms

    return () => clearInterval(interval);
  }, [state.isRunning, state.phase]);

  return {
    ...state,
    totalSeconds: minutesToSeconds(
      state.phase === 'work'
        ? config.workMinutes
        : state.phase === 'shortBreak'
          ? config.shortBreakMinutes
          : config.longBreakMinutes,
    ),
    toggleTimer: () => dispatch({ type: 'TOGGLE' }),
    resetTimer: () => dispatch({ type: 'RESET', config }),
    skipCycle: () => dispatch({ type: 'NEXT_PHASE', config }),
  };
};
