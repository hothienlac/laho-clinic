'use client';

import type React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: '/',
      label: 'Dashboard',
      active: pathname === '/' || pathname === '/dashboard',
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
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
