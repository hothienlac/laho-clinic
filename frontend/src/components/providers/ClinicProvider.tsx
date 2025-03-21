'use client';

import { Clinic, ClinicRole, ClinicRoles, Clinics } from '@/schema';
import { useClinicStore } from '@/stores/clinic.store';
import { useEffect } from 'react';

interface ClinicProviderProps {
  userClinics: Clinics;
  userRoles: ClinicRoles;
  currentClinic: Clinic | null;
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
