import ClinicProvider from '@/components/providers/ClinicProvider';
import prisma from '@/lib/prisma';
import { getUserClinicRoles, getUserClinics } from '@/services';
import { getCurrentClinic, getCurrentRole } from '@/utils';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import type React from 'react';
import DesktopHeader from './components/Header/DesktopHeader';
import MobileHeader from './components/Header/MobileHeader';
import Sidebar from './components/Sidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }

  const [userClinics, userRoles, currentClinic, currentRole] =
    await prisma.$transaction(async (tx) => {
      const userClinics = await getUserClinics(user.id)(tx);
      const currentClinic = await getCurrentClinic(userClinics);
      const userRoles = currentClinic
        ? await getUserClinicRoles(user.id, currentClinic.clinic_id)(tx)
        : [];
      const currentRole = await getCurrentRole(userRoles);
      return [userClinics, userRoles, currentClinic, currentRole];
    });

  if (!userClinics.length) {
    redirect('/create-clinicl');
  }

  return (
    <div className="flex h-screen bg-muted">
      <ClinicProvider
        userClinics={userClinics}
        userRoles={userRoles}
        currentClinic={currentClinic}
        currentRole={currentRole}
      />
      <Sidebar />
      <div className="flex flex-1 flex-col md:pl-64">
        <MobileHeader />
        <DesktopHeader />

        <main className="flex-1 overflow-y-auto bg-muted p-4 md:p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
