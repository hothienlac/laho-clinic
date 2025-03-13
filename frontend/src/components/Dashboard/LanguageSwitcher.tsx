'use client';

import { useLocale } from 'next-intl';
import { useTransition, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';

export function LanguageSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  function onSelectChange(newLocale: string) {
    startTransition(() => {
      // Set the locale cookie
      Cookies.set('NEXT_LOCALE', newLocale, { expires: 365, path: '/' });

      // Reload the page to apply the new locale
      window.location.reload();
      setIsOpen(false);
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
          <span className="sr-only">{t('switchLanguage')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => onSelectChange('en')}
          className={locale === 'en' ? 'bg-muted' : ''}
        >
          {t('en')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onSelectChange('vi')}
          className={locale === 'vi' ? 'bg-muted' : ''}
        >
          {t('vi')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
