import { z } from 'zod';

export const clinicMetadataSchema = z.object({
  taxNumber: z.string().nullable().optional(),
});
export type ClinicMetadata = z.infer<typeof clinicMetadataSchema>;

export const clinicSchema = z.object({
  clinicId: z.string(),
  clinicName: z.string(),
  address: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  description: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  metadata: clinicMetadataSchema.nullable(),
});
export type Clinic = z.infer<typeof clinicSchema>;

export const clinicsSchema = clinicSchema.array();
export type Clinics = z.infer<typeof clinicsSchema>;
