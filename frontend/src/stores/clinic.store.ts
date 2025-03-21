import { Clinic, Clinics, ClinicRole, ClinicRoles } from '@/schema';
import { create } from 'zustand';

interface ClinicState {
  userClinics: Clinics;
  userRoles: ClinicRole[];
  currentClinic: Clinic | null;
  currentRole: ClinicRole | null;
  setUserClinics: (clinics: Clinics) => void;
  setUserRoles: (roles: ClinicRoles) => void;
  setCurrentClinic: (clinic: Clinic) => void;
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
