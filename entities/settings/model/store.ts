import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { IGlobalSettingsState } from './types';

export const useGlobalSettings = create<IGlobalSettingsState>()(
  persist(
    set => ({
      volume: 0.7,
      isMuted: false,
      reducedMotion: false,
      fontSize: 16,
      setVolume: volume => set({ volume }),
      toggleMute: () => set(state => ({ isMuted: !state.isMuted })),
      setReducedMotion: reducedMotion => set({ reducedMotion }),
    }),
    {
      name: 'global-settings',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
