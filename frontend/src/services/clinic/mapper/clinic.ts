import { InternalServerErrorException } from '@/exceptions';
import { Clinic, clinicMetadataSchema, Clinics } from '@/schema';
import { clinic } from '@prisma/client';

export function mapPrismaToClinic(clinic: clinic): Clinic {
  const { data: metadata, error } = clinicMetadataSchema.safeParse(
    clinic.metadata,
  );
  if (error) {
    throw new InternalServerErrorException(
      'Error parsing clinic metadata',
      error.flatten().fieldErrors,
    );
  }

  return {
    clinicId: clinic.clinic_id,
    clinicName: clinic.clinic_name,
    address: clinic.address,
    phoneNumber: clinic.phone_number,
    description: clinic.description,
    createdAt: clinic.created_at,
    updatedAt: clinic.updated_at,
    metadata,
  };
}
export function mapPrismaToClinics(clinics: clinic[]): Clinics {
  return clinics.map((clinic) => mapPrismaToClinic(clinic));
}
