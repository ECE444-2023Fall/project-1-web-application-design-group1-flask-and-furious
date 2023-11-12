import FindEventsNavBar from '@/components/EventsNavBar';
import { Toaster } from '@/components/ui/toaster';

export default function DashboardLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full">
      <FindEventsNavBar />
      {children}
      <Toaster />
    </section>
  );
}
