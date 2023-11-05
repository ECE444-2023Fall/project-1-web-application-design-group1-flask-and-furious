'use client';
import EventCard from '@/components/EventCard';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { apiGetEvents } from '../../api';
import { formatTime } from '../../helpers';
import { EventData } from '../../types';

export default function Page() {
  const supabase = createClientComponentClient();
  const session = supabase.auth.getSession();

  const [events, setEvents] = useState<EventData[]>([]);

  const getEvents = async () => {
    apiGetEvents((await session).data.session, setEvents, {});
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="flex h-[calc(100vh-64px-64px)] w-full flex-col items-center overflow-y-auto">
      <div className="grid grid-cols-3 gap-4 p-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            eventId={event.id}
            eventName={event.Title}
            eventDescription={event.Description}
            eventLocation={event.Location}
            eventDate={event.Date}
            eventTime={`${formatTime(event.StartTime)} - ${formatTime(
              event.EndTime
            )}`}
            eventTags={event.Tags}
            eventImage={''}
          />
        ))}
      </div>
    </div>
  );
}
