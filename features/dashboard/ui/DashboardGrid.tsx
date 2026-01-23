import { ReactNode } from 'react';

type TDashboardGridProps = {
  children: ReactNode;
};

export const DashboardGrid = ({ children }: TDashboardGridProps) => {
  return (
    <section className="grid auto-rows-fr grid-cols-6 gap-4">
      {children}
    </section>
  );
};
