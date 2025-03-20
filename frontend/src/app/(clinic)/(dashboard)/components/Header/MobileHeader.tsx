import { UserButton } from '@clerk/nextjs';
import { BellIcon } from 'lucide-react';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import RoleSelectorDropdown from './RoleSelectorDropdown';

export default async function MobileHeader() {
  return (
    <div className="flex h-16 items-center justify-end gap-2 border-b bg-white px-4 md:hidden">
      <RoleSelectorDropdown />
      <LanguageSwitcher />
      <Button variant="ghost" size="icon" className="relative">
        <BellIcon className="h-5 w-5" />
        <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-accent"></span>
        <span className="sr-only">Notifications</span>
      </Button>
      <UserButton />
    </div>
  );
}
