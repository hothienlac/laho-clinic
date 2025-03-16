import { Prisma, clinic } from '@prisma/client';

export const getUserClinics =
  (userId: string) =>
  async (tx: Prisma.TransactionClient): Promise<clinic[]> => {
    // Select from clinic table, join with clinic_user table
    const clinicUsers = await tx.clinic_user.findMany({
      where: {
        user_id: userId,
      },
      select: { clinic_id: true },
      distinct: ['clinic_id'],
    });
    const clinicIds = clinicUsers.map((clinicUser) => clinicUser.clinic_id);
    if (clinicIds.length === 0) {
      return [];
    }
    const clinics = await tx.clinic.findMany({
      where: {
        clinic_id: {
          in: clinicIds,
        },
      },
    });
    return clinics;
  };
