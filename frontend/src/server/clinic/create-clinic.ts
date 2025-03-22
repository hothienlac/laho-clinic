import { CreateClinicData } from '@/schema';
import { Prisma, clinic } from '@prisma/client';

export const createClinic =
  (userId: string, createClinicData: CreateClinicData) =>
  async (tx: Prisma.TransactionClient): Promise<clinic> => {
    const createdClinic = await tx.clinic.create({
      data: {
        clinic_name: createClinicData.clinicName,
        address: createClinicData.address,
        phone_number: createClinicData.phoneNumber,
        description: createClinicData.description,
      },
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
