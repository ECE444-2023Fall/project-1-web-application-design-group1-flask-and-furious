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
  const [loading, setLoading] = useState<boolean>(true);
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

    setLoading(true);
    const awaitedSession = (await session).data.session;
    await apiGetEvents(awaitedSession, setEvents, {
      userUuid: await userUuidFromSession(awaitedSession, supabase)
    }).catch(() => {
      setPopupMessage('Failed to get events');
      setPopupType('error');
    });
    setLoading(false);
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
          {!loading ? (
            events.length > 0 ? (
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
                      eventImage={`${
                        event.image_url
                      }?v=${new Date().getTime()}`}
                      action={editEvent}
                    />
                  ))}
              </div>
            ) : (
              <div className="mb-32 flex h-full w-full items-center justify-center p-4">
                <div className="text-sm text-gray-700 md:text-lg lg:text-xl">
                  <p>You haven&apos;t created any events yet.</p>
                  <p>
                    Click the &quot;Create Event&quot; button to get started!
                  </p>
                </div>
              </div>
            )
          ) : (
            <div className="grid h-full w-full place-content-center">
              <svg
                aria-hidden="true"
                className="inline h-20 w-20 animate-spin fill-purple-600 text-white"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
