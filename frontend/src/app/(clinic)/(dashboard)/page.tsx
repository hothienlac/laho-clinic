'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Calendar,
  Package,
  Users,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const doctorName = 'Dr. Nguyen';

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">
          {t('welcome', { name: doctorName })}
        </h1>
        <p className="text-muted-foreground">{t('overview')}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t('stats.totalPatients')}
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <div className="flex items-center pt-1 text-xs">
              <ArrowUp className="mr-1 h-3 w-3 text-success" />
              <span className="font-medium text-success">10%</span>
              <span className="ml-1 text-muted-foreground">
                {t('stats.fromLastMonth')}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t('stats.appointmentsToday')}
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10">
              <Calendar className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center pt-1 text-xs">
              <span className="text-muted-foreground">
                {t('stats.remaining', { count: 6 })}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t('stats.inventoryItems')}
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
              <Package className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <div className="flex items-center pt-1 text-xs">
              <ArrowDown className="mr-1 h-3 w-3 text-destructive" />
              <span className="font-medium text-destructive">12</span>
              <span className="ml-1 text-muted-foreground">
                {t('stats.lowStock')}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {t('stats.activity')}
            </CardTitle>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10">
              <Activity className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <div className="flex items-center pt-1 text-xs">
              <ArrowUp className="mr-1 h-3 w-3 text-success" />
              <span className="font-medium text-success">24%</span>
              <span className="ml-1 text-muted-foreground">
                {t('stats.fromYesterday')}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>{t('recentActivity.title')}</CardTitle>
            <CardDescription>{t('recentActivity.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      [
                        'bg-primary/10',
                        'bg-secondary/10',
                        'bg-accent/10',
                        'bg-success/10',
                        'bg-destructive/10',
                      ][i - 1]
                    }`}
                  >
                    <div
                      className={`h-5 w-5 ${
                        [
                          'text-primary',
                          'text-secondary',
                          'text-accent',
                          'text-success',
                          'text-destructive',
                        ][i - 1]
                      }`}
                    >
                      {i === 1 && <Users className="h-5 w-5" />}
                      {i === 2 && <Package className="h-5 w-5" />}
                      {i === 3 && <Calendar className="h-5 w-5" />}
                      {i === 4 && <Package className="h-5 w-5" />}
                      {i === 5 && <Activity className="h-5 w-5" />}
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {t(
                        `recentActivity.${
                          [
                            'patientCheckIn',
                            'prescriptionFilled',
                            'appointmentScheduled',
                            'inventoryUpdated',
                            'medicalRecordUpdated',
                          ][i - 1]
                        }`,
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {
                        [
                          'Dr. Nguyen',
                          'Pharmacist Tran',
                          'Receptionist Le',
                          'Admin Pham',
                          'Dr. Hoang',
                        ][i - 1]
                      }{' '}
                      • {t('recentActivity.timeAgo', { count: i })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="w-full">
                {t('recentActivity.viewAll')}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('upcomingAppointments.title')}</CardTitle>
            <CardDescription>
              {t('upcomingAppointments.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      ['bg-primary/10', 'bg-secondary/10', 'bg-accent/10'][
                        i - 1
                      ]
                    }`}
                  >
                    <div
                      className={`h-5 w-5 ${['text-primary', 'text-secondary', 'text-accent'][i - 1]}`}
                    >
                      <Calendar className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {['Nguyen Van A', 'Tran Thi B', 'Le Van C'][i - 1]}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {['10:00 AM', '11:30 AM', '2:15 PM'][i - 1]} • Dr.{' '}
                      {['Hoang', 'Nguyen', 'Tran'][i - 1]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="secondary" className="w-full">
                {t('upcomingAppointments.schedule')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
