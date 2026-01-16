import dynamic from 'next/dynamic';

// avoid hydration issues by loading the theme switcher only on the client
export const ThemeSwitcher = dynamic(
  () => import('./ThemeSwitcherClient').then(m => m.ThemeSwitcherClient),
  {
    ssr: false,
  },
);
