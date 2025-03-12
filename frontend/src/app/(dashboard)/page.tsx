import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Activity,
  Users,
  Calendar,
  Package,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Welcome back, Dr. Nguyen</h1>
        <p className="text-muted-foreground">
          Here's what's happening at your clinic today.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <div className="flex items-center pt-1 text-xs">
              <ArrowUp className="h-3 w-3 text-success mr-1" />
              <span className="text-success font-medium">10%</span>
              <span className="text-muted-foreground ml-1">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Appointments Today
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center pt-1 text-xs">
              <span className="text-muted-foreground">6 remaining</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Inventory Items
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
              <Package className="h-4 w-4 text-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <div className="flex items-center pt-1 text-xs">
              <ArrowDown className="h-3 w-3 text-destructive mr-1" />
              <span className="text-destructive font-medium">12</span>
              <span className="text-muted-foreground ml-1">
                low stock alerts
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Activity</CardTitle>
            <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center">
              <Activity className="h-4 w-4 text-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <div className="flex items-center pt-1 text-xs">
              <ArrowUp className="h-3 w-3 text-success mr-1" />
              <span className="text-success font-medium">24%</span>
              <span className="text-muted-foreground ml-1">from yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your clinic's activity for the past 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
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
                      {
                        [
                          'Patient check-in',
                          'Prescription filled',
                          'Appointment scheduled',
                          'Inventory updated',
                          'Medical record updated',
                        ][i - 1]
                      }
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
                      • {i} hour{i !== 1 ? 's' : ''} ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Next 3 appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
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
                Schedule New Appointment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
