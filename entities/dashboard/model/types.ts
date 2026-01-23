import { TWidget } from '@/entities/widget';

export type TDashboard = {
  id: string;
  name: string;
  widgets: TWidget[];
};
