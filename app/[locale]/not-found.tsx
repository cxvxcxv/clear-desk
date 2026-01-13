import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('errors');

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">{t('notFoundTitle')}</h1>
      <p className="mt-4">{t('notFoundDescription')}</p>
    </div>
  );
}
