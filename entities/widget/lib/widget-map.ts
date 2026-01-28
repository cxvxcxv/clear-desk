import { ComponentType } from 'react';

import { TWidgetType } from '../model';

import { PomodoroWidget } from '@/features/pomodoro';
import {
  ClockWidget,
  NotesWidget,
  TasksWidget,
  WeatherWidget,
} from '@/widgets';

export const WIDGET_MAP: Record<TWidgetType, ComponentType> = {
  clock: ClockWidget,
  notes: NotesWidget,
  pomodoro: PomodoroWidget,
  weather: WeatherWidget,
  tasks: TasksWidget,
};
