'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { ClinicRole } from '@/schema';
import { useClinicStore } from '@/stores';
import { setCurrentRole } from '@/utils';
import { Check, ChevronsUpDown, Pill, Shield, Stethoscope } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useState } from 'react';

type RoleInfo = {
  name: string;
  type: ClinicRole;
  icon: React.ComponentType<{ className: string }>;
  color: string;
};

const ROLE_INFO: RoleInfo[] = [
  { name: 'Administrator', type: 'Admin', icon: Shield, color: 'text-primary' },
  {
    name: 'Doctor',
    type: 'Doctor',
    icon: Stethoscope,
    color: 'text-secondary',
  },
  { name: 'Pharmacist', type: 'Pharmacist', icon: Pill, color: 'text-accent' },
];

export default function RoleSelectorDropdown() {
  const t = useTranslations('role');
  const [open, setOpen] = useState(false);

  const { userRoles, currentRole } = useClinicStore();

  const userRoleInfos = ROLE_INFO.filter((roleInfo) =>
    userRoles.includes(roleInfo.type),
  );
  const currentRoleInfo = ROLE_INFO.find(
    (roleInfo) => roleInfo.type === currentRole,
  )!;

  const selectRole = async (role: ClinicRole) => {
    await setCurrentRole(role);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
          <currentRoleInfo.icon
            className={cn('h-4 w-4', currentRoleInfo.color)}
          />
          <span className="text-sm font-medium">
            {currentRole && t(currentRole.toLowerCase())}
          </span>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {userRoleInfos.map((roleInfo) => (
          <DropdownMenuItem
            key={roleInfo.name}
            className="flex items-center gap-2 py-2"
            onClick={() => selectRole(roleInfo.type)}
          >
            <roleInfo.icon className={cn('h-4 w-4', roleInfo.color)} />
            <span>{t(roleInfo.name.toLowerCase())}</span>
            {currentRole === roleInfo.name && (
              <Check className="ml-auto h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
