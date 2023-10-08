import EventCard from '@/components/EventCard';
import Navbar from '@/components/Navbar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session }
  } = await supabase.auth.getSession();
  return (
    <main className="flex w-full flex-col items-center">
      <Navbar session={session} />
      <div className="grid grid-cols-3 gap-4 p-4">
        {/* Create some dummy events */}
        {[1, 2, 3, 4, 5, 6, 7].map((id) => (
          <EventCard
            key={id}
            eventName={'Awesome Concert'}
            eventDescription={
              'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
            }
            eventLocation={'Galbraith 202'}
            eventDate={'29/10/2023'}
            eventTime={'8-10 pm'}
            eventTags={['Programming', 'Music', 'Dance']}
          />
        ))}
      </div>
    </main>
  );
}
