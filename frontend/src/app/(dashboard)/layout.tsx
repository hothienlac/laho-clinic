import type React from 'react';
import { UserButton } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { BellIcon } from 'lucide-react';

import { Sidebar } from '@/components/Dashboard/Sidebar';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/Dashboard/LanguageSwitcher';

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
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
          <div className="ml-auto flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" className="relative">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent"></span>
              <span className="sr-only">Notifications</span>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
