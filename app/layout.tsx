import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'ClearDesk',
  description: 'A minimalistic workspace for focused work',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
