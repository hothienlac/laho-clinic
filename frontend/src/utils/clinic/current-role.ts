import { ClinicRole, ClinicRoles } from '@/services';
import { CURRENT_ROLE_COOKIE } from './cookies';
import { setCurrentRole } from './set-current-role';

export async function getCurrentRole(
  roles: ClinicRoles,
): Promise<ClinicRole | null> {
  const { cookies } = await import('next/headers');

  if (!roles.length) {
    return null;
  }

  const cookieStore = await cookies();
  const storedRole = cookieStore.get(CURRENT_ROLE_COOKIE)?.value as ClinicRole;

  if (!roles.includes(storedRole)) {
    await setCurrentRole(roles[0]);
    return roles[0];
  }

  return storedRole;
}
