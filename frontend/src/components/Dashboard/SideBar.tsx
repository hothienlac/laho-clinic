'use client';

import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Package,
  Settings,
  Menu,
  X,
  FileText,
  PlusCircle,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type SidebarItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Patients',
    href: '/patients',
    icon: Users,
  },
  {
    title: 'Appointments',
    href: '/appointments',
    icon: Calendar,
  },
  {
    title: 'Medical Records',
    href: '/records',
    icon: FileText,
  },
  {
    title: 'Inventory',
    href: '/inventory',
    icon: Package,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
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
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <h1 className="text-xl font-bold text-primary">
              Clinic Management
            </h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  pathname === item.href || item.href === '/'
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-muted',
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    pathname === item.href || item.href === '/'
                      ? 'text-white'
                      : 'text-gray-500 group-hover:text-primary',
                  )}
                />
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="px-4 mt-6">
            <Button className="w-full bg-secondary hover:bg-secondary/90 text-white gap-2">
              <PlusCircle className="h-4 w-4" />
              New Appointment
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          'fixed inset-0 flex z-40 md:hidden transform transition-transform duration-300 ease-in-out',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
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
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4 mb-5">
              <h1 className="text-xl font-bold text-primary">
                Clinic Management
              </h1>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                    pathname === item.href || item.href === '/'
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-muted',
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      pathname === item.href || item.href === '/'
                        ? 'text-white'
                        : 'text-gray-500 group-hover:text-primary',
                    )}
                  />
                  {item.title}
                </Link>
              ))}
            </nav>
            <div className="px-4 mt-6">
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-white gap-2">
                <PlusCircle className="h-4 w-4" />
                New Appointment
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 w-14">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </div>
    </>
  );
}
