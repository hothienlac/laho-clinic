'use client';

import type React from 'react';

import { useState } from 'react';
import { Shield, Stethoscope, Pill, Check, ChevronsUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Define role types
export type UserRole = 'ADMIN' | 'DOCTOR' | 'PHARMACIST';

// Mock data for user roles
// In a real app, this would come from an API call or user data
type Role = {
  id: string;
  name: string;
  type: UserRole;
  icon: React.ElementType;
  color: string;
};

const mockRoles: Role[] = [
  {
    id: 'role-1',
    name: 'Administrator',
    type: 'ADMIN',
    icon: Shield,
    color: 'text-primary',
  },
  {
    id: 'role-2',
    name: 'Doctor',
    type: 'DOCTOR',
    icon: Stethoscope,
    color: 'text-secondary',
  },
  {
    id: 'role-3',
    name: 'Pharmacist',
    type: 'PHARMACIST',
    icon: Pill,
    color: 'text-accent',
  },
];

export function RoleSelectorDropdown() {
  const t = useTranslations('role');

  // Initialize from cookie or default to first role
  const initialRoleId = Cookies.get('SELECTED_ROLE_ID') || mockRoles[0].id;
  const initialRole =
    mockRoles.find((role) => role.id === initialRoleId) || mockRoles[0];

  const [selectedRole, setSelectedRole] = useState<Role>(initialRole);
  const [open, setOpen] = useState(false);

  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
    setOpen(false);
    // Save to cookie for persistence
    Cookies.set('SELECTED_ROLE_ID', role.id, { expires: 365, path: '/' });
  };

  const Icon = selectedRole.icon;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
          <Icon className={cn('h-4 w-4', selectedRole.color)} />
          <span className="text-sm font-medium">
            {t(selectedRole.type.toLowerCase())}
          </span>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {mockRoles.map((role) => {
          const RoleIcon = role.icon;
          return (
            <DropdownMenuItem
              key={role.id}
              className="flex items-center gap-2 py-2"
              onClick={() => handleRoleChange(role)}
            >
              <RoleIcon className={cn('h-4 w-4', role.color)} />
              <span>{t(role.type.toLowerCase())}</span>
              {selectedRole.id === role.id && (
                <Check className="h-4 w-4 ml-auto text-primary" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
