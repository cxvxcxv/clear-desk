export type TWidgetType = 'clock' | 'weather' | 'notes' | 'tasks' | 'pomodoro';

export type TWidgetLayout = {
  colSpan: number;
  rowSpan: number;
  minColSpan?: number;
  maxColSpan?: number;
  minRowSpan?: number;
  maxRowSpan?: number;
  resiable?: boolean;
};

export type TWidget = {
  id: string;
  type: TWidgetType;
  sortOrder: number;
  layout: TWidgetLayout;
};
