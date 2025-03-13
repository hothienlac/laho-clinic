'use client';

import type React from 'react';

import { useState } from 'react';
import { Shield, Stethoscope, Pill } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';

import { cn } from '@/lib/utils';

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
    color: 'bg-primary/10 text-primary border-primary/20',
  },
  {
    id: 'role-2',
    name: 'Doctor',
    type: 'DOCTOR',
    icon: Stethoscope,
    color: 'bg-secondary/10 text-secondary border-secondary/20',
  },
  {
    id: 'role-3',
    name: 'Pharmacist',
    type: 'PHARMACIST',
    icon: Pill,
    color: 'bg-accent/10 text-accent border-accent/20',
  },
];

export function RoleSelector() {
  const t = useTranslations('role');

  // Initialize from cookie or default to first role
  const initialRoleId = Cookies.get('SELECTED_ROLE_ID') || mockRoles[0].id;
  const initialRole =
    mockRoles.find((role) => role.id === initialRoleId) || mockRoles[0];

  const [selectedRole, setSelectedRole] = useState<Role>(initialRole);

  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
    // Save to cookie for persistence
    Cookies.set('SELECTED_ROLE_ID', role.id, { expires: 365, path: '/' });
  };

  return (
    <div className="px-2">
      <div className="mb-2">
        <h3 className="text-xs font-medium text-muted-foreground">
          {t('title')}
        </h3>
      </div>
      <div className="flex gap-2 flex-wrap">
        {mockRoles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.id}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors',
                role.id === selectedRole.id
                  ? role.color
                  : 'bg-muted/50 text-muted-foreground border-transparent hover:bg-muted',
              )}
              onClick={() => handleRoleChange(role)}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{t(role.type.toLowerCase())}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
