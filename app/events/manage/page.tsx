'use client';
import Drawer from '@/components/Drawer';
import EventCard from '@/components/EventCard';
import EventForm from '@/components/EventForm';
import Popup from '@/components/Popup';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const [isNewEvent, setIsNewEvent] = useState<boolean>(true);
  const [events, setEvents] = useState<EventData[]>([]);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [popupMessage, setPopupMessage] = useState<string>('');
  const [popupType, setPopupType] = useState<'error' | 'success'>('success');
  const [changeFormData, setFormData] = useState<formData>({
    eventId: -1,
    title: '',
    description: '',
    location: '',
    startTime: '',
    endTime: '',
    date: '',
    frequency: '',
    file: null,
    tags: []
  });
  // Backend
  const supabase = createClientComponentClient();
  const session = supabase.auth.getSession();
  const router = useRouter();
  const defaultImage =
    'https://yqrgbzoauzaaznsztnwb.supabase.co/storage/v1/object/public/Images/no-image';
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

  const createEvent = async (formData: formData) => {
    const data = new FormData();
    if (selectedFile) {
      data.append('file', selectedFile);
    }
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('startTime', formData.startTime);
    data.append('endTime', formData.endTime);
    data.append('date', formData.date);
    data.append('frequency', formData.frequency);
    data.append('tags', JSON.stringify(formData.tags));
    if (
      !formData.title ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.date
    ) {
      setPopupMessage(
        'Event Creation Error: Title, Start Time, End Time, and Date are required'
      );
      setPopupType('error');
      return;
    }
    await apiCreateEvent((await session).data.session, data)
      .then(() => {
        onCloseDrawer();
        setFormData({
          eventId: -1,
          title: '',
          description: '',
          location: '',
          startTime: '',
          endTime: '',
          date: '',
          frequency: '',
          file: null,
          tags: []
        });
        getEvents();
        setPopupMessage('Event Created Successfully');
        setPopupType('success');
      })
      .catch(() => {
        setPopupMessage('Event Creation Failed');
        setPopupType('error');
      });
  };

  const updateEvent = async (formData: formData) => {
    const data = new FormData();
    if (selectedFile) {
      data.append('file', selectedFile);
    }
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('location', formData.location);
    data.append('startTime', formData.startTime);
    data.append('endTime', formData.endTime);
    data.append('date', formData.date);
    data.append('frequency', formData.frequency);
    data.append('tags', JSON.stringify(formData.tags));

    if (
      !formData.title ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.date
    ) {
      setPopupMessage(
        'Event Update Error: Title, Start Time, End Time, and Date are required'
      );
      setPopupType('error');
      return;
    }

    if (formData.eventId !== -1) {
      data.append('eventId', formData.eventId.toString());
    }
    await apiUpdateEvent((await session).data.session, data)
      .then(() => {
        onCloseDrawer();
        setFormData({
          eventId: -1,
          title: '',
          description: '',
          location: '',
          startTime: '',
          endTime: '',
          date: '',
          frequency: '',
          file: null,
          tags: []
        });
        setSelectedFile(null);
        getEvents();
        setPopupMessage('Event Updated Successfully');
        setPopupType('success');
      })
      .catch(() => {
        setPopupMessage('Event Update Failed');
        setPopupType('error');
      });
  };

  const deleteEvent = async (formData: formData) => {
    await apiDeleteEvent((await session).data.session, formData)
      .then(() => {
        onCloseDrawer();
        setFormData({
          eventId: -1,
          title: '',
          description: '',
          location: '',
          startTime: '',
          endTime: '',
          date: '',
          frequency: '',
          file: null,
          tags: []
        });
        setSelectedFile(null);
        getEvents();
        setPopupMessage('Event Deleted Successfully');
        setPopupType('success');
      })
      .catch(() => {
        setPopupMessage('Event Deletion Failed');
        setPopupType('error');
      });
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
        file: null,
        tags: selectedEvent.Tags
      });
      setImageURL(selectedEvent.image_url);
    }
    onOpenDrawer();
  };

  useEffect(() => {
    getEvents();
    setImageURL(defaultImage);
  }, []);

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
    setImageURL(defaultImage);
  };
  const onOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file); // Update the state to hold the selected file
      const newImageURL = URL.createObjectURL(file); // Create a URL for the file
      setImageURL(newImageURL); // Update the state to hold the new image URL
    }
  };

  return (
    <main className="flex h-full flex-row">
      <Drawer
        isOpen={isDrawerOpen}
        style={isDrawerOpen ? '' : '-translate-x-full'}
        onClose={onCloseDrawer}
        onFileSelect={handleFileChange}
        backgroundImage={imageURL}
      >
        <EventForm
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
                setFormData({
                  eventId: -1,
                  title: '',
                  description: '',
                  location: '',
                  startTime: '',
                  endTime: '',
                  date: '',
                  frequency: '',
                  file: null,
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
          <div className="flex w-full justify-center">
            <Popup
              message={popupMessage}
              type={popupType}
              setMessage={setPopupMessage}
            />
          </div>
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
                  eventImage={`${event.image_url}?v=${new Date().getTime()}`}
                  action={editEvent}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
