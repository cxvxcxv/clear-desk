'use client';

import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export const LocaleSwitcher = () => {
  const locales = routing.locales;
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('aria');

  const handleChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <label htmlFor="language-switcher">
      <span className="sr-only">{t('languageSwitcher')}</span>
      <select
        id="language-switcher"
        onChange={e => handleChange(e.target.value)}
        value={currentLocale}
      >
        {locales.map(locale => (
          <option key={locale} value={locale}>
            {locale.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
};
