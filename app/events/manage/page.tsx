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
    console.log(session);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: `Bearer ${(await session).data.session?.access_token}`
      }
    };
    fetch('/api/event', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.parse(data)['data']);
        setEvents(JSON.parse(data)['data']);
      });
  };

  const Post = async (formData: formData) => {
    console.log('IN POST: ', formData);
    console.log('Proper Form: ', events);
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
      const response = await fetch('/api/event', requestOptions);
      if (response.ok) {
        const data = await response.json();
        console.log('Successful response:', data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    Get();
  }, []);

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  const onOpenDrawer = () => {
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
    <main className="relative h-screen w-full">
      <Drawer
        isOpen={isDrawerOpen}
        style={`overflow-y-auto absolute h-screen bg-slate-50 left-0 transform-transition duration-500 w-1/3 bg-slate-50 ${
          isDrawerOpen ? '' : '-translate-x-full'
        }`}
        onClose={onCloseDrawer}
        Post={Post}
        initialFormData={changeFormData}
      >
        <EventForm onClose={onCloseDrawer}/>
      </Drawer>
      <div
        className={`transform-transition absolute right-0 h-screen duration-500 ${
          isDrawerOpen ? 'w-2/3 ' : 'w-full'
        }`}
      >
        <div onClick={onOpenDrawer} className="cursor-pointer flex h-9 w-full items-center bg-slate-50 p-3">
          <h5 className="text-lg font-bold">Create Event</h5>
          <SquaresPlusIcon
            className="ml-2 h-5 w-5 fill-current stroke-1 text-black"
            aria-hidden="true"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 p-4">
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
    </main>
  );
}
