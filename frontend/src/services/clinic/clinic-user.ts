import { Prisma } from '@prisma/client';
import { Roles } from './types/role';

export const checkUserHaveClinic =
  (userId: string) =>
  async (tx: Prisma.TransactionClient): Promise<boolean> => {
    const clinicUser = await tx.clinic_user.findFirst({
      where: {
        user_id: userId,
      },
    });
    return !!clinicUser;
  };

export const getUserAvailableRoles =
  (userId: string, clinicId: string) =>
  async (prisma: Prisma.TransactionClient): Promise<Roles> => {
    const clinicUsers = await prisma.clinic_user.findMany({
      where: {
        user_id: userId,
        clinic_id: clinicId,
      },
    });
    const availableRoles = clinicUsers.map((clinicUser) => clinicUser.role);
    return availableRoles;
  };
