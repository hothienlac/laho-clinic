import { ClinicRole } from '@/services';
import { clinic } from '@prisma/client';
import { create } from 'zustand';

interface ClinicState {
  userClinics: clinic[];
  userRoles: ClinicRole[];
  currentClinic: clinic | null;
  currentRole: ClinicRole | null;
  setUserClinics: (clinics: clinic[]) => void;
  setUserRoles: (roles: ClinicRole[]) => void;
  setCurrentClinic: (clinic: clinic) => void;
  setCurrentRole: (role: ClinicRole) => void;
}

export const useClinicStore = create<ClinicState>((set) => ({
  userClinics: [],
  userRoles: [],
  currentClinic: null,
  currentRole: null,
  setUserClinics: (clinics) => set({ userClinics: clinics }),
  setUserRoles: (roles) => set({ userRoles: roles }),
  setCurrentClinic: (clinic) => set({ currentClinic: clinic }),
  setCurrentRole: (role) => set({ currentRole: role }),
}));
