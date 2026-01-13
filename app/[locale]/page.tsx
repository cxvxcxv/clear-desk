import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations();

  return (
    <div>
      <h1 className="text-2xl font-bold">{t('header.title')}</h1>
    </div>
  );
}
