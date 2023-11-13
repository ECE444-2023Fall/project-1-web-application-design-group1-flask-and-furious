'use client';
import Drawer from '@/components/Drawer';
import EventCard from '@/components/EventCard';
import EventModal from '@/components/EventModal';
import Filters from '@/components/Filters';
import { toast } from '@/components/ui/use-toast';
import { useDisclosure } from '@nextui-org/react';
import {
  Session,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { apiGetEvents, apiGetRSVPCounts, apiGetRSVPEvents } from '../../api';
import { formatTime, userUuidFromSession } from '../../helpers';
import { EventData } from '../../types';

export type FilteredEventData = EventData & { hidden: boolean };

export default function Page() {
  const supabase = createClientComponentClient();
  const session = supabase.auth.getSession();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [modelEvent, setModelEvent] = useState<EventData>({} as EventData);
  const [tagOptions, setTagOptions] = useState<Record<string, boolean>>({});
  const [events, setEvents] = useState<EventData[]>([]);
  const [rsvpCounts, setRSVPCounts] = useState<Record<number, number>>({});
  const [filteredEvents, setFilteredEvents] = useState<FilteredEventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sessionData, setSessionData] = useState<Session | undefined>(
    undefined
  ); // [TODO] - remove this line and the line below [TODO
  const [RSVPevents, setRSVPEvents] = useState<number[]>([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);

  const getEvents = async () => {
    setLoading(true);
    await apiGetEvents((await session).data.session, {})
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to get events');
        }
        const data = await res.json();
        setEvents(JSON.parse(data)['data']);
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Failed to get events',
          description: 'Something went wrong. Please try again later'
        });
      });
    setLoading(false);
  };

  const getRSVPEvents = async () => {
    const awaitedSession = (await session).data.session;
    if (awaitedSession) {
      apiGetRSVPEvents(awaitedSession, {
        userUuid: await userUuidFromSession(awaitedSession, supabase)
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error('Failed to get RSVP events');
          }
          const data = await res.json();
          setRSVPEvents(JSON.parse(data)['data'][0]['events']);
        })
        .catch(() => {
          toast({
            variant: 'destructive',
            title: "Failed to get RSVP'd events",
            description: 'Something went wrong. Please try again later'
          });
        });
    }
  };

  const getEventRsvpCounts = async () => {
    await apiGetRSVPCounts((await session).data.session)
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to get RSVP events');
        }
        const data = await res.json();
        setRSVPCounts(data);
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Failed to Retrieve RSVP Counts',
          description: 'Something went wrong. Please try again later'
        });
      });
  };

  useEffect(() => {
    getEvents();
    getEventRsvpCounts();
    getRSVPEvents();

    async function fetchSession() {
      const sessionResult = (await session)?.data.session; // Replace with your actual session fetching function
      setSessionData(sessionResult || undefined);
    }

    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setFilteredEvents(
      events.map((event) => ({
        ...event,
        hidden: false
      }))
    );
  }, [events]);

  useEffect(() => {
    const getTags = async () => {
      const { data } = await supabase.from('Tags').select();

      //Convert data from {0: {id: 1, tag: 'tag1'}, 1: {id: 2, tag: 'tag2'}} to {tag1: false, tag2: false}

      if (data) {
        const sortedTags = data.sort((a, b) => a.tag.localeCompare(b.tag));
        setTagOptions(
          Object.fromEntries(sortedTags.map((tag) => [tag.tag, false]))
        );
      }
    };

    getTags();
  }, []);

  const openModal = (event: EventData) => {
    setModelEvent(event);
    onOpen();
  };

  return (
    <div className="flex max-h-[calc(100vh-7rem)] flex-row">
      <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
        <div className="h-[calc(100vh-4rem-3rem)]">
          <Filters
            setEvents={setFilteredEvents}
            rsvpEvents={RSVPevents}
            tags={tagOptions}
            setTags={setTagOptions}
          />
        </div>
      </Drawer>
      {!loading ? (
        <div
          className={`absolute grid max-h-[calc(100vh-7rem)] overflow-y-auto duration-500 ${
            isDrawerOpen ? 'left-1/3 w-2/3 grid-cols-4' : 'left-10 grid-cols-5 '
          } gap-4 p-4`}
        >
          {filteredEvents
            .filter((e) => e.hidden == false)
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
                viewer
                setRSVPEvents={setRSVPEvents}
                RSVPEvents={RSVPevents}
                rsvpCount={rsvpCounts[event.id]}
                session={sessionData}
                action={() => openModal(event)}
              />
            ))}

          <EventModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            event={modelEvent}
          />
        </div>
      ) : (
        <svg
          aria-hidden="true"
          className={`${
            isDrawerOpen ? 'left-2/3' : 'left-1/2'
          } absolute bottom-[calc(50%-6rem)] h-20 w-20 animate-spin fill-purple-600 text-white duration-500`}
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
      )}
    </div>
  );
}
