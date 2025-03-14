import React from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { BellIcon } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import RoleSelectorDropdown from './RoleSelectorDropdown';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getUserAvailableRoles } from '@/services/clinic/clinic-user';

export default async function DesktopHeader() {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }
  const availableRoles = await prisma.$transaction(
    getUserAvailableRoles(user.id, clinicId),
  );

  return (
    <header className="sticky top-0 z-10 hidden md:flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
      <div className="ml-auto flex items-center gap-2">
        <RoleSelectorDropdown availableRoles={availableRoles} role={role} />
        <LanguageSwitcher />
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent"></span>
          <span className="sr-only">Notifications</span>
        </Button>
        <UserButton />
      </div>
    </header>
  );
}
