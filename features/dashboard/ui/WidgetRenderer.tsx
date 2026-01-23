'use client';

import { ComponentType } from 'react';

import { WidgetCard } from './WidgetCard';
import { TWidget, TWidgetType } from '@/entities/widget';
import { ClockWidget, NotesWidget, PomodoroWidget } from '@/widgets';

type WidgetRendererProps = {
  widget: TWidget;
};

const WIDGET_COMPONENTS: Record<TWidgetType, ComponentType> = {
  clock: ClockWidget,
  notes: NotesWidget,
  pomodoro: PomodoroWidget,
  tasks: () => <div>Tasks widget</div>,
  weather: () => <div>Weather widget</div>,
};

export const WidgetRenderer = ({ widget }: WidgetRendererProps) => {
  const ContentComponent = WIDGET_COMPONENTS[widget.type];

  return (
    <WidgetCard
      type={widget.type}
      onEdit={() => console.log('Edit', widget.id)}
      onDelete={() => console.log('Delete', widget.id)}
      className={`col-span-${widget.layout.colSpan} row-span-${widget.layout.rowSpan}`}
    >
      <ContentComponent />
    </WidgetCard>
  );
};
