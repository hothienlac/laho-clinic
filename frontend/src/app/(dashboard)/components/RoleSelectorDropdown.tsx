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
};

const allRoleInfos: RoleInfo[] = [
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
  availableRoles: ClinicRoles;
  selectedRole: ClinicRole;
}

export default function RoleSelectorDropdown({
  availableRoles,
  selectedRole,
}: RoleSelectorDropdownProps) {
  const t = useTranslations('role');
  const [open, setOpen] = useState(false);

  const rolesInfos = allRoleInfos.filter((r) =>
    availableRoles.includes(r.type),
  );
  const selectedRoleInfo = allRoleInfos.find((r) => r.type === selectedRole)!;
  const Icon = selectedRoleInfo.icon;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
          <Icon className={cn('h-4 w-4', selectedRoleInfo.color)} />
          <span className="text-sm font-medium">
            {t(selectedRoleInfo.type.toLowerCase())}
          </span>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {rolesInfos.map((roleInfo) => {
          const RoleIcon = roleInfo.icon;
          return (
            <DropdownMenuItem
              key={roleInfo.type}
              className="flex items-center gap-2 py-2"
              // onClick={() => handleRoleChange(roleInfo)}
            >
              <RoleIcon className={cn('h-4 w-4', roleInfo.color)} />
              <span>{t(roleInfo.type.toLowerCase())}</span>
              {selectedRoleInfo.type === roleInfo.type && (
                <Check className="h-4 w-4 ml-auto text-primary" />
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
