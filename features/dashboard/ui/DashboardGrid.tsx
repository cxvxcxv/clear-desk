import { ReactNode } from 'react';
import { Responsive, useContainerWidth } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { MOCK_DASHBOARDS } from '@/shared/mocks';

type TDashboardGridProps = {
  children: ReactNode;
};

export const DashboardGrid = ({ children }: TDashboardGridProps) => {
  const { width, containerRef, mounted } = useContainerWidth();

  const baseLayout = MOCK_DASHBOARDS[0].widgets.map((widget, index) => ({
    i: widget.id.toString(),
    x: index % 3,
    y: Math.floor(index / 3),
    w: widget.layout.colSpan,
    h: widget.layout.rowSpan,
  }));

  const layouts = {
    lg: baseLayout,
    md: baseLayout,
    sm: baseLayout,
    xs: baseLayout,
    xxs: baseLayout,
  };

  return (
    <section ref={containerRef} aria-label="Dashboard widgets">
      {mounted && (
        <Responsive
          width={width}
          breakpoints={{ lg: 1024, md: 768, sm: 640, xs: 320, xxs: 0 }}
          cols={{ lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 }}
          layouts={layouts}
          rowHeight={400}
          // draggableHandle=".drag-handle"
        >
          {children}
        </Responsive>
      )}
    </section>
  );
};
