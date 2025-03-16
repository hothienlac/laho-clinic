import Cookies from 'js-cookie';
import { throwNever } from '../throw-never';
import { CURRENT_CLINIC_COOKIE } from './cookies';

export async function setCurrentClinic(clinic: string): Promise<never> {
  Cookies.set(CURRENT_CLINIC_COOKIE, clinic, { expires: 365 });
  window.location.reload();
  throwNever();
}
