'use client';
import EventCard from '@/components/EventCard';
import { Json } from '@/lib/database.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { apiGetEvents } from '../../api';
import { formatTime } from '../../helpers';
import { EventData } from '../../types';

export default function Page() {
  const supabase = createClientComponentClient();
  const session = supabase.auth.getSession();

  const [events, setEvents] = useState<EventData[] | null>(null);

  const getEvents = async () => {
    apiGetEvents((await session).data.session, setEvents, {});
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="flex h-[calc(100vh-64px-64px)] w-full flex-col items-center overflow-y-auto">
      <div className="grid grid-cols-3 gap-4 p-4">
        {events?.map((event) => (
          <EventCard
            key={event.eventId}
            eventId={event.eventId}
            title={event.title || ''}
            description={event.description || ''}
            location={event.location || ''}
            date={event.date || ''}
            length={`${formatTime(event.startTime as string)} - ${formatTime(
              event.endTime as string
            )}`}
            tags={event.tags as Json[]}
          />
        ))}
      </div>
    </div>
  );
}
