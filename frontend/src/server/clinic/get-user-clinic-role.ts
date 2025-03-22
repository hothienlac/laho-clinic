import { Prisma } from '@prisma/client';
import { ClinicRoles } from './types/role';

export const getUserClinicRoles =
  (userId: string, clinicId: string) =>
  async (prisma: Prisma.TransactionClient): Promise<ClinicRoles> => {
    const clinicUsers = await prisma.clinic_user.findMany({
      where: {
        user_id: userId,
        clinic_id: clinicId,
      },
    });
    const userRoles = clinicUsers.map((clinicUser) => clinicUser.role);
    return userRoles;
  };
