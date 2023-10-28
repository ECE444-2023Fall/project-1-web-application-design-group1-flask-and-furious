'use client';
import Drawer from '@/components/Drawer';
import EventCard from '@/components/EventCard';
import EventForm from '@/components/EventForm';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

export interface EventCardProps {
  eventName: string;
  eventLocation: string;
  eventDate: string;
  eventTime: string;
  eventFrequency: string;
  eventTags: string[];
  eventDescription: string;
}

interface EventData {
  id: number;
  created_at: string;
  Owner: string;
  Title: string;
  Description: string;
  Location: string;
  StartTime: string;
  EndTime: string;
  Frequency: string;
  Tags: string[];
  Date: string;
}

interface formData {
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  date: string;
  frequency: string;
  tags: string[];
}

export default function Home() {
  // Initialize isOpen state
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const [events, setEvents] = useState<EventData[]>([]);
  const [changeFormData, setFormData] = useState<formData>({
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

  const Get = async () => {
    //console.log(session);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: `Bearer ${(await session).data.session?.access_token}`
      }
    };
    fetch('/api/events', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        //console.log(JSON.parse(data)['data']);
        setEvents(JSON.parse(data)['data']);
      });
  };

  const Post = async (formData: formData) => {
    //console.log('IN POST: ', formData);
    //console.log('Proper Form: ', events);
    try {
      const requestBody = JSON.stringify(formData);
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: `Bearer ${(await session).data.session?.access_token}`
        },
        body: requestBody
      };
      await fetch('/api/events', requestOptions);
      setFormData({
        title: '',
        description: '',
        location: '',
        startTime: '',
        endTime: '',
        date: '',
        frequency: '',
        tags: []
      });
      Get();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching events: ', error);
    }
  };

  useEffect(() => {
    Get();
  }, []);

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  const onOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':');
    const parsedTime = new Date();
    parsedTime.setHours(parseInt(hours, 10));
    parsedTime.setMinutes(parseInt(minutes, 10));
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    return parsedTime.toLocaleTimeString([], options);
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
          Post={Post}
          initialFormData={changeFormData}
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
            onClick={() => (isDrawerOpen ? onCloseDrawer() : onOpenDrawer())}
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
            {events.map((event) => (
              <EventCard
                key={event.id}
                eventName={event.Title}
                eventDescription={event.Description}
                eventLocation={event.Location}
                eventDate={event.Date}
                eventTime={`${formatTime(event.StartTime)} - ${formatTime(
                  event.EndTime
                )}`}
                eventTags={event.Tags}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
