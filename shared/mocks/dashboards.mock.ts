import { TDashboard } from '@/entities/dashboard';

export const MOCK_DASHBOARDS: TDashboard[] = [
  {
    id: 'main',
    name: 'My Dashboard',
    widgets: [
      {
        id: 'w1',
        type: 'clock',
        sortOrder: 1,
        layout: { colSpan: 2, rowSpan: 1 },
      },
      {
        id: 'w2',
        type: 'notes',
        sortOrder: 2,
        layout: { colSpan: 2, rowSpan: 2 },
      },
    ],
  },
];
