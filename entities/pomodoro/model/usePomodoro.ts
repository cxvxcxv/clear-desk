'use client';

import { useEffect, useMemo, useReducer, useRef } from 'react';

import { minutesToSeconds } from '../lib';

import { usePomodoroSettings } from './store';
import { IPomodoroSettings, IPomodoroState, TPomodoroPhase } from './types';

type TAction =
  | { type: 'TICK' }
  | { type: 'TOGGLE' }
  | { type: 'RESET'; settings: IPomodoroSettings }
  | { type: 'NEXT_PHASE'; settings: IPomodoroSettings }
  | { type: 'SYNC_SETTINGS'; settings: IPomodoroSettings };

function reducer(state: IPomodoroState, action: TAction): IPomodoroState {
  switch (action.type) {
    case 'TICK':
      return {
        ...state,
        remainingSeconds: Math.max(0, state.remainingSeconds - 1),
      };

    case 'TOGGLE':
      return { ...state, isRunning: !state.isRunning };

    case 'RESET':
      return {
        phase: 'work',
        remainingSeconds: minutesToSeconds(action.settings.workMinutes),
        isRunning: false,
        completedCycles: 0,
      };

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
        isRunning: state.isRunning,
      };
    }

    case 'SYNC_SETTINGS': {
      if (state.isRunning) return state;

      const durations = {
        work: action.settings.workMinutes,
        shortBreak: action.settings.shortBreakMinutes,
        longBreak: action.settings.longBreakMinutes,
      };

      return {
        ...state,
        remainingSeconds: minutesToSeconds(durations[state.phase]),
      };
    }
    default:
      return state;
  }
}

export const usePomodoro = () => {
  const settings = usePomodoroSettings();
  const workerRef = useRef<Worker | null>(null);

  const [state, dispatch] = useReducer(reducer, {
    phase: 'work',
    remainingSeconds: minutesToSeconds(settings.workMinutes),
    isRunning: false,
    completedCycles: 0,
  });

  // sync settings on change
  useEffect(() => {
    dispatch({ type: 'SYNC_SETTINGS', settings });
  }, [settings]);

  // init worker
  useEffect(() => {
    const worker = new Worker(new URL('./timer.worker.ts', import.meta.url)); // use relative path - safe for bundler

    worker.onmessage = (e: MessageEvent) => {
      if (e.data === 'TICK') dispatch({ type: 'TICK' });
    };

    workerRef.current = worker;
    return () => worker.terminate();
  }, []);

  // contorl worker based on state
  useEffect(() => {
    if (state.isRunning && state.remainingSeconds > 0) {
      workerRef.current?.postMessage({ cmd: 'START' });
    } else {
      workerRef.current?.postMessage({ cmd: 'STOP' });
    }
  }, [state.isRunning, state.remainingSeconds]);

  // switch phase when timer hits zero
  useEffect(() => {
    if (state.remainingSeconds === 0 && state.isRunning) {
      dispatch({ type: 'NEXT_PHASE', settings });
    }
  }, [state.remainingSeconds, state.isRunning, settings]);

  // derived values for the ui
  const totalSeconds = useMemo(() => {
    const map = {
      work: settings.workMinutes,
      shortBreak: settings.shortBreakMinutes,
      longBreak: settings.longBreakMinutes,
    };
    return minutesToSeconds(map[state.phase]);
  }, [state.phase, settings]);

  return {
    ...state,
    totalSeconds,
    toggleTimer: () => dispatch({ type: 'TOGGLE' }),
    resetTimer: () => dispatch({ type: 'RESET', settings }),
    skipCycle: () => dispatch({ type: 'NEXT_PHASE', settings }),
  };
};
