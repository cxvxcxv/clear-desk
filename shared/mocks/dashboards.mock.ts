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
        layout: { colSpan: 1, rowSpan: 1 },
      },
      {
        id: 'w2',
        type: 'notes',
        sortOrder: 2,
        layout: { colSpan: 1, rowSpan: 1 },
      },
      {
        id: 'w3',
        type: 'pomodoro',
        sortOrder: 3,
        layout: { colSpan: 1, rowSpan: 1 },
      },
      {
        id: 'w4',
        type: 'weather',
        sortOrder: 4,
        layout: { colSpan: 1, rowSpan: 1 },
      },
      {
        id: 'w5',
        type: 'tasks',
        sortOrder: 5,
        layout: { colSpan: 1, rowSpan: 1 },
      },
    ],
  },
];
