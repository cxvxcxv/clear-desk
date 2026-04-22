import clsx from 'clsx';
import { HTMLAttributes, ReactNode, forwardRef } from 'react';

import { TWidgetLayout } from '@/entities/widget';

type TDashboardGridItemProps = {
  layout: TWidgetLayout;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const DashboardGridItem = forwardRef<
  HTMLDivElement,
  TDashboardGridItemProps
>(({ style, className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      style={style}
      className={clsx('flex h-full min-h-0 flex-col', className)}
      {...props}
    >
      {children}
    </div>
  );
});
DashboardGridItem.displayName = 'DashboardGridItem';
