'use client';

import { useTranslations } from 'next-intl';

import { DashboardGrid, WidgetRenderer } from '@/features/dashboard';
import { MOCK_DASHBOARDS } from '@/shared/mocks';

export default function Home() {
  const dashboard = MOCK_DASHBOARDS[0];
  const t = useTranslations();
  return (
    <section>
      <h1 className="text-2xl font-medium">{t('navigation.dashboard')}</h1>
      <DashboardGrid>
        {dashboard.widgets
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map(widget => (
            <WidgetRenderer key={widget.id} widget={widget} />
          ))}
      </DashboardGrid>
    </section>
  );
}
