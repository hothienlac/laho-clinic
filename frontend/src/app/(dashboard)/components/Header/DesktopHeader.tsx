import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { BellIcon } from 'lucide-react';
import { LanguageSwitcher } from '../../../../components/LanguageSwitcher';
import RoleSelectorDropdown from './RoleSelectorDropdown';

export default async function DesktopHeader() {
  return (
    <header className="sticky top-0 z-10 hidden h-16 items-center gap-4 border-b bg-white px-4 md:flex md:px-6">
      <div className="ml-auto flex items-center gap-2">
        <RoleSelectorDropdown />
        <LanguageSwitcher />
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-accent"></span>
          <span className="sr-only">Notifications</span>
        </Button>
        <UserButton />
      </div>
    </header>
  );
}
