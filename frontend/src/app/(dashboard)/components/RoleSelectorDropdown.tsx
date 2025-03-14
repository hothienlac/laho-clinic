import type React from 'react';

import { useState } from 'react';
import { Shield, Stethoscope, Pill, Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ClinicRole } from '@/types/clinic';
import { useTranslations } from 'next-intl';

// Mock data for user roles
// In a real app, this would come from an API call or user data
type Role = {
  name: string;
  type: ClinicRole;
  icon: React.ElementType;
  color: string;
};
type Roles = Role[];

const mockRoles: Roles = [
  {
    name: 'Administrator',
    type: 'Admin',
    icon: Shield,
    color: 'text-primary',
  },
  {
    name: 'Doctor',
    type: 'Doctor',
    icon: Stethoscope,
    color: 'text-secondary',
  },
  {
    name: 'Pharmacist',
    type: 'Pharmacist',
    icon: Pill,
    color: 'text-accent',
  },
];

interface RoleSelectorDropdownProps {
  role: ClinicRole;
}

export default function RoleSelectorDropdown({
  role,
}: RoleSelectorDropdownProps) {
  const t = useTranslations('role');
  const [open, setOpen] = useState(false);

  const selectedRole = mockRoles.find((r) => r.type === role) ?? mockRoles[0];
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
              key={role.type}
              className="flex items-center gap-2 py-2"
              // onClick={() => handleRoleChange(role)}
            >
              <RoleIcon className={cn('h-4 w-4', role.color)} />
              <span>{t(role.type.toLowerCase())}</span>
              {selectedRole.type === role.type && (
                <Check className="h-4 w-4 ml-auto text-primary" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
