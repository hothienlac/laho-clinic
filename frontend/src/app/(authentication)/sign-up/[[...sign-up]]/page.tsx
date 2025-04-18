'use client';

import { APPLICATION_NAME } from '@/application-information';
import { SignUp } from '@clerk/nextjs';
import { useTranslations } from 'next-intl';

export default function SignUpPage() {
  const t = useTranslations('auth');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-primary">
          {APPLICATION_NAME}
        </h1>
        <p className="text-muted-foreground">{t('signUpDescription')}</p>
      </div>
      <div className="flex w-full max-w-md justify-center">
        <SignUp />
      </div>
    </div>
  );
}
