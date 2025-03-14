import { z } from 'zod';

export const ADMIN = 'Admin' as const;
export const DOCTOR = 'Doctor' as const;
export const PHARMACIST = 'Pharmacist' as const;

export const roles = [ADMIN, DOCTOR, PHARMACIST] as const;

export const roleSchema = z.enum(roles);
export type Role = z.infer<typeof roleSchema>;

export const rolesSchema = roleSchema.array();
export type Roles = z.infer<typeof rolesSchema>;
