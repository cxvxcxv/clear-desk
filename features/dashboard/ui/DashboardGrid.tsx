import { ReactNode } from 'react';
import {
  Layout,
  Responsive,
  ResponsiveLayouts,
  useContainerWidth,
} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { useDashboardStore } from '@/entities/dashboard';

export const DashboardGrid = ({ children }: { children: ReactNode }) => {
  const { width, containerRef, mounted } = useContainerWidth({
    measureBeforeMount: true,
  });
  const { layouts, setLayouts } = useDashboardStore();

  const handleLayoutChange = (
    _currentLayout: Layout,
    allLayouts: ResponsiveLayouts,
  ) => {
    setLayouts(allLayouts);
  };

  return (
    <section ref={containerRef} aria-label="Dashboard widgets">
      {mounted && (
        <Responsive
          width={width}
          breakpoints={{ lg: 1024, md: 768, sm: 640, xs: 320, xxs: 0 }}
          cols={{ lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 }}
          layouts={layouts}
          onLayoutChange={handleLayoutChange}
          rowHeight={400}
          dragConfig={{
            enabled: true,
            handle: '.handle',
          }}
          resizeConfig={{
            enabled: true,
            handles: ['se', 'sw'],
          }}
        >
          {children}
        </Responsive>
      )}
    </section>
  );
};
