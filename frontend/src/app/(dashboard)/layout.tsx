import type React from 'react';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import Sidebar from './components/Sidebar';
import MobileHeader from './components/MobileHeader';
import DesktopHeader from './components/DestopHeader';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="flex h-screen bg-muted">
      <Sidebar />
      <div className="flex flex-col flex-1 md:pl-64">
        <MobileHeader />
        <DesktopHeader />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
