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
      style={{
        gridColumn: `span ${layout.colSpan}`,
        gridRow: `span ${layout.rowSpan}`,
      }}
    >
      {children}
    </div>
  );
};
