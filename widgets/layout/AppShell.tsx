'use client';

import { ReactNode, useState } from 'react';

import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const AppShell = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <section className="flex h-screen">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        onSidebarClose={() => setIsSidebarOpen(false)}
      />
      <div className="md:ml-sidebar-width">
        <Header
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
        />
        <main id="main-content" className="flex-1 p-4">
          {children}
        </main>
      </div>
    </section>
  );
};
