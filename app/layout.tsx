import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { Manrope } from 'next/font/google';
import { ReactNode } from 'react';

import './globals.css';

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  applicationName: 'ClearDesk',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${manrope.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
