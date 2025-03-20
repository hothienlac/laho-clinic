'use client';

import type React from 'react';

import { ArrowRight, Building2, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function CreateClinicPage() {
  const t = useTranslations('onboarding');
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateClinic = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Redirect to dashboard after "creating" the clinic
    router.push('/');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('createNewClinic')}</CardTitle>
        <CardDescription>{t('createClinicDescription')}</CardDescription>
      </CardHeader>
      <form onSubmit={handleCreateClinic}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="clinic-name">{t('clinicName')}</Label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Building2 className="h-5 w-5" />
                </div>
                <Input
                  id="clinic-name"
                  placeholder={t('clinicNamePlaceholder')}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="clinic-email">{t('clinicEmail')}</Label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 mute">
                  <Mail className="h-5 w-5" />
                </div>
                <Input
                  id="clinic-email"
                  type="email"
                  placeholder={t('clinicEmailPlaceholder')}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="clinic-phone">{t('clinicPhone')}</Label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Phone className="h-5 w-5" />
                </div>
                <Input
                  id="clinic-phone"
                  placeholder={t('clinicPhonePlaceholder')}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="clinic-address">{t('clinicAddress')}</Label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute left-3 top-3 flex items-start">
                  <MapPin className="h-5 w-5" />
                </div>
                <Textarea
                  id="clinic-address"
                  placeholder={t('clinicAddressPlaceholder')}
                  className="min-h-[80px] pl-10"
                  required
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t('creating') : t('createClinic')}
            {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
