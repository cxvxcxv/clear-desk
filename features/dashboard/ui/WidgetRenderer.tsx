'use client';

import { WidgetCard } from './WidgetCard';
import { TWidget, WIDGET_MAP } from '@/entities/widget';

type WidgetRendererProps = {
  widget: TWidget;
};
export const WidgetRenderer = ({ widget }: WidgetRendererProps) => {
  const ContentComponent = WIDGET_MAP[widget.type];

  return (
    <WidgetCard
      type={widget.type}
      layout={widget.layout}
      onEdit={() => console.log('Edit', widget.id)}
      onDelete={() => console.log('Delete', widget.id)}
    >
      <ContentComponent />
    </WidgetCard>
  );
};
