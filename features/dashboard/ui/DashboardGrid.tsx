import { ReactNode } from 'react';

type TDashboardGridProps = {
  children: ReactNode;
};

export const DashboardGrid = ({ children }: TDashboardGridProps) => {
  return (
    <section
      aria-label="Dashboard widgets"
      className="grid grid-cols-4 gap-4"
      style={{ gridAutoRows: 'minmax(400px, 1fr)' }}
    >
      {children}
    </section>
  );
};
