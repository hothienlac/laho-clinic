import { Locale } from '@/i18n/config';
import Cookies from 'js-cookie';
import { throwNever } from '../throw-never';
import { LOCALE_COOKIE } from './cookies';

export async function setCurrentLocale(locale: Locale): Promise<never> {
  Cookies.set(LOCALE_COOKIE, locale, { expires: 365 });
  window.location.reload();
  throwNever();
}
