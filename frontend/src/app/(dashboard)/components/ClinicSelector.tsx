'use client';

import { Building2, Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

// Mock data for clinics
// In a real app, this would come from an API call
type Clinic = {
  id: string;
  name: string;
  address: string;
};

const mockClinics: Clinic[] = [
  {
    id: 'clinic-1',
    name: 'Main Street Clinic',
    address: '123 Main St, City',
  },
  {
    id: 'clinic-2',
    name: 'Downtown Medical Center',
    address: '456 Downtown Ave, City',
  },
  {
    id: 'clinic-3',
    name: 'Westside Health Clinic',
    address: '789 West Blvd, City',
  },
];

export function ClinicSelector() {
  const [currentClinic, setcurrentClinic] = useState<Clinic>(mockClinics[0]);
  const [open, setOpen] = useState(false);

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
              <span className="text-sm font-medium">{currentClinic.name}</span>
              <span className="max-w-[180px] truncate text-xs text-muted-foreground">
                {currentClinic.address}
              </span>
            </div>
          </div>
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[250px]">
        {mockClinics.map((clinic) => (
          <DropdownMenuItem
            key={clinic.id}
            className={cn(
              'flex flex-col items-start py-2',
              currentClinic.id === clinic.id && 'bg-muted',
            )}
            onClick={() => {
              setcurrentClinic(clinic);
              setOpen(false);
            }}
          >
            <div className="flex w-full items-center justify-between">
              <span className="font-medium">{clinic.name}</span>
              {currentClinic.id === clinic.id && (
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
