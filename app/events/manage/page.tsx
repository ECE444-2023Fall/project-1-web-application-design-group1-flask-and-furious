'use client';
import Drawer from '@/components/Drawer';
import EventCard from '@/components/EventCard';
import EventForm from '@/components/EventForm';
import { Json } from '@/lib/database.types';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  apiCreateEvent,
  apiDeleteEvent,
  apiGetEvents,
  apiUpdateEvent
} from '../api';
import { formatTime, userUuidFromSession } from '../helpers';
import { EventData } from '../types';

const defaultState: EventData = {
  eventId: -1,
  title: '',
  owner: '',
  description: '',
  location: '',
  startTime: '',
  endTime: '',
  date: '',
  frequency: '',
  tags: []
};

export default function Home() {
  // Initialize isOpen state
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const [isNewEvent, setIsNewEvent] = useState<boolean>(true);
  const [events, setEvents] = useState<EventData[] | null>(null);
  const [changeFormData, setFormData] = useState<EventData>(defaultState);
  // Backend
  const supabase = createClientComponentClient();
  const session = supabase.auth.getSession();
  const router = useRouter();

  const getEvents = async () => {
    if (!(await session).data?.session) {
      router.push('/login');
      return;
    }

    const awaitedSession = (await session).data.session;
    apiGetEvents(awaitedSession, setEvents, {
      userUuid: await userUuidFromSession(awaitedSession, supabase)
    });
  };

  const createEvent = async (formData: EventData) => {
    await apiCreateEvent((await session).data.session, formData);
    setFormData(defaultState);
    getEvents();
  };

  const updateEvent = async (formData: EventData) => {
    try {
      await apiUpdateEvent((await session).data.session, formData);
      setFormData(defaultState);
      getEvents();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating event: ', error);
    }
  };

  const deleteEvent = async (formData: EventData) => {
    try {
      await apiDeleteEvent((await session).data.session, formData);
      setFormData(defaultState);
      getEvents();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating event: ', error);
    }
  };

  const editEvent = (id: number) => {
    setIsNewEvent(false);
    const selectedEvent = events?.find((event) => event.eventId === id);
    if (selectedEvent) {
      setFormData({
        eventId: selectedEvent.eventId,
        title: selectedEvent.title,
        owner: selectedEvent.owner,
        description: selectedEvent.description,
        location: selectedEvent.location,
        startTime: selectedEvent.startTime,
        endTime: selectedEvent.endTime,
        date: selectedEvent.date,
        frequency: selectedEvent.frequency,
        tags: selectedEvent.tags
      });
    }
    onOpenDrawer();
  };

  useEffect(() => {
    getEvents();
  }, []);

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  const onOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  return (
    <main className="flex h-full flex-row">
      <Drawer
        isOpen={isDrawerOpen}
        style={isDrawerOpen ? '' : '-translate-x-full'}
        onClose={onCloseDrawer}
      >
        <EventForm
          onClose={onCloseDrawer}
          Post={createEvent}
          initialFormData={changeFormData}
          Update={updateEvent}
          isNewEvent={isNewEvent}
          Delete={deleteEvent}
        />
      </Drawer>
      <div
        className={`transform-transition absolute right-0 h-[calc(100vh-64px)] duration-500 ${
          isDrawerOpen ? 'w-2/3 ' : 'w-full'
        }`}
      >
        <div className="flex h-9 w-full  items-center bg-slate-50 p-3">
          <div
            className="flex cursor-pointer items-center"
            onClick={() => {
              if (isDrawerOpen) {
                onCloseDrawer();
              } else {
                onOpenDrawer();
                setIsNewEvent(true);
                setFormData(defaultState);
              }
            }}
          >
            <h5 className="text-lg font-bold">Create Event</h5>
            <SquaresPlusIcon
              className="ml-2 h-5 w-5 fill-current stroke-1 text-black"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="flex h-[calc(100vh-64px-36px)] flex-col items-center overflow-y-auto">
          <div className="grid grid-cols-3 gap-4 overflow-y-auto p-4">
            {events
              ?.sort(
                (a, b) =>
                  new Date(a.date as string).getTime() -
                  new Date(b.date as string).getTime()
              )
              .map((event) => (
                <EventCard
                  key={event.eventId}
                  eventId={event.eventId}
                  title={event.title || ''}
                  description={event.description || ''}
                  location={event.location || ''}
                  date={event.date || ''}
                  length={`${formatTime(
                    event.startTime as string
                  )} - ${formatTime(event.endTime as string)}`}
                  tags={event.tags as Json[]}
                  action={editEvent}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
