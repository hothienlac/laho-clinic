'use client';

import { SignIn } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

export default function SignInPage() {
  const t = useTranslations('auth');
  const appT = useTranslations('app');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">{appT('name')}</h1>
        <p className="text-muted-foreground">{t('signInDescription')}</p>
      </div>
      <div className="w-full max-w-md">
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <SignIn />
        </div>
      </div>
    </div>
  );
}
