import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import { ReactNode } from 'react';

type TDashboardGridProps = {
  children: ReactNode;
};

export const DashboardGrid = ({ children }: TDashboardGridProps) => {
  return (
    <section
      aria-label="Dashboard widgets"
      className="grid grid-cols-1 grid-rows-[400px] gap-4 md:grid-cols-2 lg:grid-cols-3"
    >
      {children}
    </section>
  );
};
