import { LayoutProps } from '@/types';
import DesktopHeader from './components/Header/DesktopHeader';
import MobileHeader from './components/Header/MobileHeader';
import Sidebar from './components/Sidebar';

export default async function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-muted">
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
