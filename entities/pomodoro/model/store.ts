import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { IPomodoroSettings } from './types';

interface IPomodoroStore extends IPomodoroSettings {
  updateSettings: (settings: Partial<IPomodoroSettings>) => void;
  resetToDefault: () => void;
}

const DEFAULT_SETTINGS: IPomodoroSettings = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  cyclesBeforeLongBreak: 4,
  isMuted: false,
  volume: 0.8,
  soundPack: 'default',
};

export const usePomodoroSettings = create<IPomodoroStore>()(
  persist(
    set => ({
      ...DEFAULT_SETTINGS,

      updateSettings: newSettings =>
        set(state => ({ ...state, ...newSettings })),

      resetToDefault: () => set(DEFAULT_SETTINGS),
    }),
    {
      name: 'pomodoro-settings',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
