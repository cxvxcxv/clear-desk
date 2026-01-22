'use client';

import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();
  return (
    <section>
      <h1 className="text-2xl font-medium">{t('navigation.dashboard')}</h1>
    </section>
  );
}
