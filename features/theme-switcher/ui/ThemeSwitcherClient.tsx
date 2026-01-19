'use client';

import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

export const ThemeSwitcherClient = () => {
  const t = useTranslations();
  const { setTheme, resolvedTheme } = useTheme();

  if (!resolvedTheme) return null;

  const isLight = resolvedTheme === 'light';
  const nextTheme: 'light' | 'dark' = isLight ? 'dark' : 'light';

  return (
    <button
      type="button"
      aria-label={t('aria.switchTheme', {
        theme: t(`theme.${nextTheme}`),
      })}
      onClick={() => setTheme(nextTheme)}
    >
      {isLight ? (
        <Moon strokeWidth={1.5} className="hover:fill-foreground" />
      ) : (
        <Sun strokeWidth={1.5} className="hover:fill-foreground" />
      )}
    </button>
  );
};
