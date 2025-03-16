import { defaultLocale, Locale } from '@/i18n/config';
import { create } from 'zustand';

interface ClinicState {
  currentLocale: Locale;
  setCurrentLocale: (locale: Locale) => void;
}

export const useClinicStore = create<ClinicState>((set) => ({
  currentLocale: defaultLocale,
  setCurrentLocale: (locale) => set({ currentLocale: locale }),
}));
