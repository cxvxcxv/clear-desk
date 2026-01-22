import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { ThemeProvider } from 'next-themes';
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
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
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
