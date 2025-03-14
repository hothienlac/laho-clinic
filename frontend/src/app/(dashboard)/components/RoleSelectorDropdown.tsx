"use client";

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
import { useTranslations } from 'next-intl';
import { ClinicRole, ClinicRoles } from '@/services/clinic/types/role';

type RoleInfo = {
  name: string;
  type: ClinicRole;
  icon: React.ComponentType<{ className: string }>;
  color: string;
}

const ROLE_INFO: RoleInfo[] = [
  { name: 'Administrator', type: "Admin", icon: Shield, color: 'text-primary' },
{ name: 'Doctor', type: "Doctor", icon: Stethoscope, color: 'text-secondary' },
{ name: 'Pharmacist', type: "Pharmacist", icon: Pill, color: 'text-accent' },
]

interface RoleSelectorDropdownProps {
  availableRoles: ClinicRoles;
  selectedRole: ClinicRole;
  selectRole: (role: ClinicRole) => void;
}

export default function RoleSelectorDropdown({
  availableRoles,
  selectedRole,
  selectRole,
}: RoleSelectorDropdownProps) {
  const t = useTranslations('role');
  const [open, setOpen] = useState(false);

  const availableRoleInfos = ROLE_INFO.filter((roleInfo) =>
    availableRoles.includes(roleInfo.type)
  );
  const selectedRoleInfo = ROLE_INFO.find((roleInfo) => roleInfo.type === selectedRole)!;


  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
          <selectedRoleInfo.icon
            className={cn('h-4 w-4', selectedRoleInfo.color)}
          />
          <span className="text-sm font-medium">
            {t(selectedRole.toLowerCase())}
          </span>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {availableRoleInfos.map((roleInfo) => (
          <DropdownMenuItem
            key={roleInfo.name}
            className="flex items-center gap-2 py-2"
            onClick={() => selectRole(roleInfo.type)}
          >
            <roleInfo.icon className={cn('h-4 w-4', roleInfo.color)} />
            <span>{t(roleInfo.name.toLowerCase())}</span>
            {selectedRole === roleInfo.name && (
              <Check className="h-4 w-4 ml-auto text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
