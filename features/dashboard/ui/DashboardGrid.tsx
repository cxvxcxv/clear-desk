import { ReactNode } from 'react';

type TDashboardGridProps = {
  children: ReactNode;
};

export const DashboardGrid = ({ children }: TDashboardGridProps) => {
  return (
    <section
      aria-label="Dashboard widgets"
      className="grid grid-cols-1 grid-rows-[400px] gap-4 md:grid-cols-2 lg:grid-cols-3"
      // style={{ gridAutoRows: 'minmax(400px, 1fr)' }}
    >
      {children}
    </section>
  );
};
