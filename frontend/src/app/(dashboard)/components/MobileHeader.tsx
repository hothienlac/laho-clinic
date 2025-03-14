import { UserButton } from '@clerk/nextjs';
import { BellIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { RoleSelectorDropdown } from './RoleSelectorDropdown';

export default async function MobileHeader() {
  return (
    <div className="flex md:hidden items-center justify-end gap-2 h-16 px-4 border-b bg-white">
      <RoleSelectorDropdown />
      <LanguageSwitcher />
      <Button variant="ghost" size="icon" className="relative">
        <BellIcon className="h-5 w-5" />
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-accent"></span>
        <span className="sr-only">Notifications</span>
      </Button>
      <UserButton />
    </div>
  );
}
