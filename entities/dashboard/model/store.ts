import { LayoutItem, ResponsiveLayouts } from 'react-grid-layout';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { MOCK_DASHBOARDS } from '@/shared/mocks';

interface DashboardStore {
  layouts: ResponsiveLayouts;
  setLayouts: (newLayouts: ResponsiveLayouts) => void;
}

const baseLayout: LayoutItem[] = MOCK_DASHBOARDS[0].widgets.map(
  (widget, index) => ({
    i: String(widget.id),
    x: index % 3,
    y: Math.floor(index / 3),
    w: widget.layout.colSpan,
    h: widget.layout.rowSpan,
  }),
);

const DEFAULT_LAYOUTS: ResponsiveLayouts = {
  lg: baseLayout,
  md: baseLayout,
  sm: baseLayout,
  xs: baseLayout,
  xxs: baseLayout,
};

export const useDashboardStore = create<DashboardStore>()(
  persist(
    set => ({
      layouts: DEFAULT_LAYOUTS,
      setLayouts: newLayouts => set({ layouts: newLayouts }),
    }),
    {
      name: 'dashboard-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
