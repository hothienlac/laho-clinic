import { ClinicRole } from '@/services';
import Cookies from 'js-cookie';
import { throwNever } from '../throw-never';
import { CURRENT_ROLE_COOKIE } from './cookies';

export async function setCurrentRole(role: ClinicRole): Promise<never> {
  Cookies.set(CURRENT_ROLE_COOKIE, role, { expires: 365 });
  window.location.reload();
  throwNever();
}
