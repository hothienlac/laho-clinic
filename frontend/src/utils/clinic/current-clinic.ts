import { Clinic, Clinics } from '@/schema';
import { CURRENT_CLINIC_COOKIE } from './cookies';
import { setCurrentClinic } from './set-current-clinic';

export async function getCurrentClinic(
  userClinics: Clinics,
): Promise<Clinic | null> {
  const { cookies } = await import('next/headers');

  if (!userClinics.length) {
    return null;
  }

  const cookieStore = await cookies();
  const storedClinic = cookieStore.get(CURRENT_CLINIC_COOKIE)?.value;
  const clinic = userClinics.find((c) => c.clinicId === storedClinic);

  if (!clinic) {
    await setCurrentClinic(userClinics[0].clinicId);
    return userClinics[0];
  }

  return clinic;
}
