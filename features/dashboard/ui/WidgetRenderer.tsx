'use client';

import { DashboardGridItem } from './DashboardGridItem';
import { WidgetCard } from './WidgetCard';
import { WidgetNotFound } from './WidgetNotFound';
import { TWidget, WIDGET_MAP } from '@/entities/widget';

type WidgetRendererProps = {
  widget: TWidget;
};
export const WidgetRenderer = ({ widget }: WidgetRendererProps) => {
  const ContentComponent = WIDGET_MAP[widget.type] ?? WidgetNotFound;

  return (
    <DashboardGridItem layout={widget.layout}>
      <WidgetCard
        type={widget.type}
        onEdit={() => console.log('Edit', widget.id)}
        onDelete={() => console.log('Delete', widget.id)}
      >
        <ContentComponent />
      </WidgetCard>
    </DashboardGridItem>
  );
};
