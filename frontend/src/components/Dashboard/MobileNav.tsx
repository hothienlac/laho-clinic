'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const routes = [
    {
      href: '/',
      label: 'Dashboard',
      active: pathname === '/',
    },
    {
      href: '/patients',
      label: 'Patients',
      active: pathname === '/patients',
    },
    {
      href: '/appointments',
      label: 'Appointments',
      active: pathname === '/appointments',
    },
    {
      href: '/inventory',
      label: 'Inventory',
      active: pathname === '/inventory',
    },
    {
      href: '/settings',
      label: 'Settings',
      active: pathname === '/settings',
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
          >
            <span className="font-bold">Clinic Management System</span>
          </Link>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                'px-7 py-2 text-base font-medium transition-colors hover:text-primary',
                route.active ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              {route.label}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
