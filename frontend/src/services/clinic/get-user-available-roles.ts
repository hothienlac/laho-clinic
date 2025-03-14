import { Prisma } from '@prisma/client';
import { Roles } from './types/role';

export const getUserAvailableRoles = (userId: string, clinicId: string) => async (prisma: Prisma.TransactionClient): Promise<Roles> => {
  const clinicUsers = await prisma.clinic_user.findMany({
    where: {
      user_id: userId,
      clinic_id: clinicId,
    },
  });
  
}
