import { Prisma } from '@prisma/client';

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
