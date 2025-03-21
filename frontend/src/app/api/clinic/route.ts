import { UnprocessableEntityException } from '@/exceptions';
import prisma from '@/lib/prisma';
import { createClinicDataSchema } from '@/schema';
import {
  createClinic,
  getCurrentUser,
} from '@/services';
import { exceptionHandler } from '@/utils';
import { NextApiRequest } from 'next';

async function createClinicController(request: NextApiRequest) {
  const user = await getCurrentUser();
  const { data: createClinicData, error } = createClinicDataSchema.safeParse(
    request.body,
  );
  if (error) {
    throw new UnprocessableEntityException(
      'Invalid data provided',
      error.flatten().fieldErrors,
    );
  }
  await prisma.$transaction(createClinic(user.id, createClinicData));
  return new Response();
}

export const POST = exceptionHandler(createClinicController);
