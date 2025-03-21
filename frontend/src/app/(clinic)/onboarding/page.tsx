'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Building2, MapPin, Phone, StickyNote } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

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
import { CreateClinicData, createClinicDataSchema } from '@/schema';
import { useClinicStore } from '@/stores';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function CreateClinicPage() {
  const t = useTranslations('onboarding');
  const { currentClinic } = useClinicStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateClinicData>({
    resolver: zodResolver(createClinicDataSchema),
  });

  const createClinic = async (data: CreateClinicData) => {
    try {
      await axios.post('/clinic', data);
      startTransition(() => {
        router.push('/');
      });
    } catch (error) {
      console.error('Create clinic failed:', error);
    }
  };

  if (currentClinic) {
    router.push('/');
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('createNewClinic')}</CardTitle>
        <CardDescription>{t('createClinicDescription')}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(createClinic)}>
        <CardContent className="space-y-6">
          <div className="space-y-4">

            {/* Clinic Name */}
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
                  {...register('clinicName')}
                />
                {errors.clinicName && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.clinicName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Phone Number */}
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
                  {...register('phoneNumber')}
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
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
                  {...register('address')}
                />
                {errors.address && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="clinic-description">{t('clinicDescription')}</Label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute left-3 top-3 flex items-start">
                  <StickyNote className="h-5 w-5" />
                </div>
                <Textarea
                  id="clinic-description"
                  placeholder={t('clinicDescriptionPlaceholder')}
                  className="min-h-[80px] pl-10"
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>

          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting || isPending}>
            {(isSubmitting || isPending) ? t('creating') : t('createClinic')}
            {!(isSubmitting || isPending) && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
