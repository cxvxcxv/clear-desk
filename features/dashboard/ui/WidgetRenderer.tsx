'use client';

import { forwardRef } from 'react';

import { DashboardGridItem } from './DashboardGridItem';
import { WidgetCard } from './WidgetCard';
import { WidgetNotFound } from './WidgetNotFound';
import { TWidget, WIDGET_MAP } from '@/entities/widget';

type WidgetRendererProps = {
  widget: TWidget;
  style?: React.CSSProperties;
  className?: string;
  onMouseDown?: React.MouseEventHandler;
  onMouseUp?: React.MouseEventHandler;
  onTouchEnd?: React.TouchEventHandler;
};

export const WidgetRenderer = forwardRef<HTMLDivElement, WidgetRendererProps>(
  ({ widget, style, className, onMouseDown, onMouseUp, onTouchEnd }, ref) => {
    const ContentComponent = WIDGET_MAP[widget.type] ?? WidgetNotFound;

    return (
      <DashboardGridItem
        ref={ref}
        layout={widget.layout}
        style={style}
        className={className}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
      >
        <WidgetCard
          type={widget.type}
          onEdit={() => console.log('Edit', widget.id)}
          onDelete={() => console.log('Delete', widget.id)}
        >
          <ContentComponent />
        </WidgetCard>
      </DashboardGridItem>
    );
  },
);

WidgetRenderer.displayName = 'WidgetRenderer';
