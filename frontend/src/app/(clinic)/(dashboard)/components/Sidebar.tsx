'use client';

import type React from 'react';

import {
  Calendar,
  FileText,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  Users,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ClinicSelector } from './ClinicSelector';

type SidebarItem = {
  titleKey: string;
  href: string;
  icon: React.ElementType;
};

const sidebarItems: SidebarItem[] = [
  {
    titleKey: 'dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    titleKey: 'patients',
    href: '/patients',
    icon: Users,
  },
  {
    titleKey: 'appointments',
    href: '/appointments',
    icon: Calendar,
  },
  {
    titleKey: 'medicalRecords',
    href: '/records',
    icon: FileText,
  },
  {
    titleKey: 'inventory',
    href: '/inventory',
    icon: Package,
  },
  {
    titleKey: 'settings',
    href: '/settings',
    icon: Settings,
  },
];

export default function Sidebar() {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
        <span className="sr-only">Toggle Menu</span>
      </Button>

      {/* Sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pb-4 pt-5">
          <div className="mb-5 flex-shrink-0 px-4">
            {/* Clinic selector */}
            <ClinicSelector />
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                  pathname === item.href ||
                    (item.href === '/' && pathname === '/dashboard')
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-muted',
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    pathname === item.href ||
                      (item.href === '/' && pathname === '/dashboard')
                      ? 'text-white'
                      : 'text-gray-500 group-hover:text-primary',
                  )}
                />
                {t(item.titleKey)}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          'fixed inset-0 z-40 flex transform transition-transform duration-300 ease-in-out md:hidden',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
          <div className="absolute right-0 top-0 -mr-12 pt-2">
            <Button
              variant="ghost"
              size="icon"
              className="ml-1 text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          <div className="h-0 flex-1 overflow-y-auto pb-4 pt-5">
            <div className="mb-5 flex-shrink-0 px-4">
              {/* Clinic selector in mobile view */}
              <ClinicSelector />
            </div>
            <nav className="mt-5 space-y-1 px-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    pathname === item.href ||
                      (item.href === '/' && pathname === '/dashboard')
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-muted',
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      pathname === item.href ||
                        (item.href === '/' && pathname === '/dashboard')
                        ? 'text-white'
                        : 'text-gray-500 group-hover:text-primary',
                    )}
                  />
                  {t(item.titleKey)}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="w-14 flex-shrink-0">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </div>
    </>
  );
}
