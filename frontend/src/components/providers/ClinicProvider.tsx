'use client';

import { ClinicRole } from '@/services';
import { useClinicStore } from '@/stores/clinic.store';
import { clinic } from '@prisma/client';
import { useEffect } from 'react';

interface ClinicProviderProps {
  userClinics: clinic[];
  userRoles: ClinicRole[];
  currentClinic: clinic | null;
  currentRole: ClinicRole | null;
}

export default function ClinicProvider({
  userClinics,
  userRoles,
  currentClinic,
  currentRole,
}: ClinicProviderProps) {
  const { setUserClinics, setUserRoles, setCurrentClinic, setCurrentRole } =
    useClinicStore();

  useEffect(() => {
    if (userClinics) setUserClinics(userClinics);
    if (userRoles) setUserRoles(userRoles);
    if (currentClinic) setCurrentClinic(currentClinic);
    if (currentRole) setCurrentRole(currentRole);
  }, [
    userClinics,
    userRoles,
    currentClinic,
    currentRole,

    setUserClinics,
    setUserRoles,
    setCurrentClinic,
    setCurrentRole,
  ]);

  return null;
}
