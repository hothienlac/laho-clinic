import { z } from 'zod';

export const ADMIN = 'Admin' as const;
export const DOCTOR = 'Doctor' as const;
export const PHARMACIST = 'Pharmacist' as const;

export const clinicRoles = [ADMIN, DOCTOR, PHARMACIST] as const;

export const clinicRoleSchema = z.enum(clinicRoles);
export type ClinicRole = z.infer<typeof clinicRoleSchema>;

export const clinicRolesSchema = clinicRoleSchema.array();
export type ClinicRoles = z.infer<typeof clinicRolesSchema>;

export const COOKIE_SELECTED_ROLE = 'Selected-Role';
