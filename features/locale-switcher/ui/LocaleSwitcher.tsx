'use client';

import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { Option, Select } from '@/shared/ui';

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
      <Select
        id="language-switcher"
        value={currentLocale}
        onChange={e => handleChange(e.target.value)}
      >
        {locales.map(locale => (
          <Option key={locale} value={locale} className="bg-card">
            {locale.toUpperCase()}
          </Option>
        ))}
      </Select>
    </label>
  );
};
