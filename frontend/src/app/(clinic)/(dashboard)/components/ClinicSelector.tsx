'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useClinicStore } from '@/stores';
import { Building2, Check, ChevronsUpDown } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export function ClinicSelector() {
  const { userClinics, currentClinic, setCurrentClinic } = useClinicStore();

  const [open, setOpen] = useState(false);

  if (!currentClinic) {
    redirect('/onboarding');
    return null;
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full justify-between px-3 py-2 text-left font-normal"
        >
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {currentClinic.clinicName}
              </span>
              <span className="max-w-[180px] truncate text-xs text-muted-foreground">
                {currentClinic.address}
              </span>
            </div>
          </div>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[250px]">
        {userClinics.map((clinic) => (
          <DropdownMenuItem
            key={clinic.clinic_id}
            className={cn(
              'flex flex-col items-start py-2',
              currentClinic.clinic_id === clinic.clinic_id && 'bg-muted',
            )}
            onClick={() => {
              setCurrentClinic(clinic);
              setOpen(false);
            }}
          >
            <div className="flex w-full items-center justify-between">
              <span className="font-medium">{clinic.clinicName}</span>
              {currentClinic.clinic_id === clinic.clinic_id && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {clinic.address}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
