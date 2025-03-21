import ClinicProvider from '@/components/providers/ClinicProvider';
import prisma from '@/lib/prisma';
import { getUserClinicRoles, getUserClinics } from '@/services';
import { LayoutProps } from '@/types';
import { getCurrentClinic, getCurrentRole } from '@/utils';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function ClinicLayout({ children }: LayoutProps) {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }

  const [userClinics, userRoles, currentClinic, currentRole] =
    await prisma.$transaction(async (tx) => {
      const userClinics = await getUserClinics(user.id)(tx);
      const currentClinic = await getCurrentClinic(userClinics);
      const userRoles = currentClinic
        ? await getUserClinicRoles(user.id, currentClinic.clinicId)(tx)
        : [];
      const currentRole = await getCurrentRole(userRoles);
      return [userClinics, userRoles, currentClinic, currentRole];
    });

  // if (!userClinics.length ) {
  //   redirect('/onboarding');
  // }

  return (
    <>
      <ClinicProvider
        userClinics={userClinics}
        userRoles={userRoles}
        currentClinic={currentClinic}
        currentRole={currentRole}
      />
      {children}
    </>
  );
}
