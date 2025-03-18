'use client';

import { SignUp } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

export default function SignUpPage() {
  const t = useTranslations('auth');
  const appT = useTranslations('app');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-primary">{appT('name')}</h1>
        <p className="text-muted-foreground">{t('signUpDescription')}</p>
      </div>
      <div className="w-full max-w-md">
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <SignUp />
        </div>
      </div>
    </div>
  );
}
