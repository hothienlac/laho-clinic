import { z } from 'zod';

export const createClinicDataSchema = z.object({
  clinicName: z.string(),
  address: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  description: z.string().nullable(),
});
export type CreateClinicData = z.infer<typeof createClinicDataSchema>;
