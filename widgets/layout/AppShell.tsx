'use client';

import { ReactNode, useState } from 'react';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const AppShell = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <section className="flex h-screen flex-col">
      <Header
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          onSidebarClose={() => setIsSidebarOpen(false)}
        />
        <main id="main-content" className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </section>
  );
};
