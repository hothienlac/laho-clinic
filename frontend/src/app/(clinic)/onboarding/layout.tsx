import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { LayoutProps } from '@/types';
import { useTranslations } from 'next-intl';

export default function CreateClinicLayout({ children }: LayoutProps) {
  const t = useTranslations('onboarding');

  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <header className="border-b bg-white py-4">
        <div className="container max-w-5xl flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">{t('title')}</h1>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container max-w-5xl flex-1 py-8">
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-bold">{t('welcome')}</h2>
          <p>{t('getStartedDescription')}</p>
        </div>

        {children}
      </main>
    </div>
  );
}
