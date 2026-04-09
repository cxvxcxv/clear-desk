import { ReactNode } from 'react';

import { TWidgetLayout } from '@/entities/widget';

type TDashboardGridItemProps = {
  layout: TWidgetLayout;
  children: ReactNode;
};

export const DashboardGridItem = ({
  layout,
  children,
}: TDashboardGridItemProps) => {
  return (
    <div
      className="flex h-full min-h-0 flex-col overflow-hidden"
      style={{
        gridColumn: `span ${layout.colSpan}`,
        gridRow: `span ${layout.rowSpan}`,
      }}
    >
      {children}
    </div>
  );
};
