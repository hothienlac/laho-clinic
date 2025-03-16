'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LOCALE_EN, LOCALE_VN } from '@/i18n/config';
import Cookies from 'js-cookie';
import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useEffect, useMemo, useState, useTransition } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [longLocale, setLongLocale] = useState(locale);

  const languages = useMemo(
    () => [
      { code: LOCALE_EN, label: 'English' },
      { code: LOCALE_VN, label: 'Vietnamese' },
    ],
    [],
  );

  useEffect(() => {
    const longLocale = languages.find((lang) => lang.code === locale)?.label;
    setLongLocale(longLocale || '');
  }, [languages, locale]);

  function onSelectChange(newLocale: string) {
    startTransition(() => {
      // Set the locale cookie
      Cookies.set('NEXT_LOCALE', newLocale, { expires: 365, path: '/' });

      // Reload the page to apply the new locale
      window.location.reload();
    });
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          disabled={isPending}
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">{longLocale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map(({ code, label }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => onSelectChange(code)}
            className={locale === code ? 'bg-muted' : ''}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
