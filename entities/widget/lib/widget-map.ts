import { ComponentType } from 'react';

import { TWidgetType } from '../model';

import { Clock, Notes, Pomodoro, Tasks, Weather } from '@/widgets';

export const WIDGET_MAP: Record<TWidgetType, ComponentType> = {
  clock: Clock,
  notes: Notes,
  pomodoro: Pomodoro,
  weather: Weather,
  tasks: Tasks,
};
