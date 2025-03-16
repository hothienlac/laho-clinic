import { Prisma, clinic } from '@prisma/client';
import { z } from 'zod';

export const createClinicInputSchema = z.object({
  clinic_name: z.string(),
  address: z.string().nullable(),
  phone_number: z.string().nullable(),
  description: z.string().nullable(),
});
export type CreateClinicInput = z.infer<typeof createClinicInputSchema>;

export const createClinic =
  (input: CreateClinicInput) =>
  async (tx: Prisma.TransactionClient): Promise<clinic> => {
    const createdClinic = await tx.clinic.create({
      data: input,
    });
    return createdClinic;
  };
