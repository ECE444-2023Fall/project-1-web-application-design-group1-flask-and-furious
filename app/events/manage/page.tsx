'use client';
import Drawer from '@/components/Drawer';
import EventCard from '@/components/EventCard';
import EventForm from '@/components/EventForm';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiCreateEvent, apiGetEvents } from '../api';
import { formatTime } from '../helpers';
import { EventData, formData } from '../types';

export interface EventCardProps {
  eventName: string;
  eventLocation: string;
  eventDate: string;
  eventTime: string;
  eventFrequency: string;
  eventTags: string[];
  eventDescription: string;
}

export default function Home() {
  // Initialize isOpen state
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const [isNewEvent, setIsNewEvent] = useState<boolean>(true);
  const [events, setEvents] = useState<EventData[]>([]);
  const [changeFormData, setFormData] = useState<formData>({
    eventId: 0,
    title: '',
    description: '',
    location: '',
    startTime: '',
    endTime: '',
    date: '',
    frequency: '',
    tags: []
  });
  // Backend
  const supabase = createClientComponentClient();
  const session = supabase.auth.getSession();
  const router = useRouter();

  const getEvents = async () => {
    if (!(await session).data?.session) {
      router.push('/login');
      return;
    }
    apiGetEvents((await session).data.session, setEvents);
  };

  const createEvent = async (formData: formData) => {
    await apiCreateEvent((await session).data.session, formData);
    setFormData({
      eventId: 0,
      title: '',
      description: '',
      location: '',
      startTime: '',
      endTime: '',
      date: '',
      frequency: '',
      tags: []
    });
    getEvents();
  };

  const Update = async (formData: formData) => {
    try {
      const requestBody = JSON.stringify(formData);
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authentication: `Bearer ${(await session).data.session?.access_token}`
        },
        body: requestBody
      };
      await fetch(`/api/events`, requestOptions);
      setFormData({
        eventId: 0,
        title: '',
        description: '',
        location: '',
        startTime: '',
        endTime: '',
        date: '',
        frequency: '',
        tags: []
      });
      getEvents();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating event: ', error);
    }
  };

  const Delete = async (formData: formData) => {
    try {
      const requestBody = JSON.stringify(formData);
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authentication: `Bearer ${(await session).data.session?.access_token}`
        },
        body: requestBody
      };
      await fetch(`/api/events`, requestOptions);
      setFormData({
        eventId: 0,
        title: '',
        description: '',
        location: '',
        startTime: '',
        endTime: '',
        date: '',
        frequency: '',
        tags: []
      });
      getEvents();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating event: ', error);
    }
  };

  const editEvent = (id: number) => {
    setIsNewEvent(false);
    const selectedEvent = events.find((event) => event.id === id);
    if (selectedEvent) {
      setFormData({
        eventId: selectedEvent.id,
        title: selectedEvent.Title,
        description: selectedEvent.Description,
        location: selectedEvent.Location,
        startTime: selectedEvent.StartTime,
        endTime: selectedEvent.EndTime,
        date: selectedEvent.Date,
        frequency: selectedEvent.Frequency,
        tags: selectedEvent.Tags
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
          Update={Update}
          isNewEvent={isNewEvent}
          Delete={Delete}
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
                setFormData({
                  eventId: 0,
                  title: '',
                  description: '',
                  location: '',
                  startTime: '',
                  endTime: '',
                  date: '',
                  frequency: '',
                  tags: []
                });
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
              .sort(
                (a, b) =>
                  new Date(a.Date).getTime() - new Date(b.Date).getTime()
              )
              .map((event) => (
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
                  action={editEvent}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
