import { Prisma, clinic } from '@prisma/client';
import { z } from 'zod';

export const createClinicDataSchema = z.object({
  clinic_name: z.string(),
  address: z.string().nullable(),
  phone_number: z.string().nullable(),
  description: z.string().nullable(),
});
export type CreateClinicData = z.infer<typeof createClinicDataSchema>;

export const createClinic =
  (userId: string, clinicData: CreateClinicData) =>
  async (tx: Prisma.TransactionClient): Promise<clinic> => {
    const createdClinic = await tx.clinic.create({
      data: clinicData,
    });
    await tx.clinic_user.create({
      data: {
        user_id: userId,
        clinic_id: createdClinic.clinic_id,
        role: 'Admin',
      },
    });
    return createdClinic;
  };
