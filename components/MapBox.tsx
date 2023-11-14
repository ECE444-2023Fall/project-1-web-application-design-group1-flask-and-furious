'use client';
import {
  apiGetEvents,
  apiGetRSVPCounts,
  apiGetRSVPEvents
} from '@/app/events/api';
import { userUuidFromSession } from '@/app/events/helpers';
import { EventData } from '@/app/events/types';
import { useDisclosure } from '@nextui-org/react';
import {
  Session,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs';
import mapboxgl from 'mapbox-gl';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import EventCard from './EventCard';
import EventModal from './EventModal';
import { toast } from './ui/use-toast';

// this is where all of our map logic is going to live
// adding the empty dependency array ensures that the map
// is only created once

export default function MapBox() {
  const mapContainer = useRef(null);

  const supabase = createClientComponentClient();
  const session = supabase.auth.getSession();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [events, setEvents] = useState<EventData[] | null>(null);
  const [RSVPevents, setRSVPEvents] = useState<number[]>([]);
  const [rsvpCounts, setRsvpCounts] = useState<Record<number, number> | null>(
    null
  );
  const [sessionData, setSessionData] = useState<Session | undefined>(
    undefined
  );
  const [selectedEvent, setSelectedEvent] = useState<EventData>(
    {} as EventData
  );
  const [modelRsvpCount, setModelRsvpCount] = useState<number>(0);

  const getEvents = async () => {
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
        setRsvpCounts(data);
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Failed to Retrieve RSVP Counts',
          description: 'Something went wrong. Please try again later'
        });
      });
  };

  const openModal = (event: EventData) => {
    if (!rsvpCounts) return;
    setSelectedEvent(event);
    setModelRsvpCount(rsvpCounts[event.id]);
    onOpen();
  };

  useEffect(() => {
    getEvents();
    getRSVPEvents();
    getEventRsvpCounts();

    async function fetchSession() {
      const sessionResult = (await session)?.data.session; // Replace with your actual session fetching function
      setSessionData(sessionResult || undefined);
    }

    fetchSession();
  }, []);

  useEffect(() => {
    // create the map and configure it
    // check out the API reference for more options
    // https://docs.mapbox.com/mapbox-gl-js/api/map/
    if (!RSVPevents || !events || !rsvpCounts) return;
    const map = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      container: 'map',
      style: 'mapbox://styles/mapbox/standard-beta',
      center: [-79.39486600749379, 43.66027265761257],
      optimizeForTerrain: true,
      minZoom: 13,
      zoom: 16,
      pitch: 60
    });
    map.on('load', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (map as any).setConfigProperty('basemap', 'lightPreset', 'dusk');
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        maxzoom: 10
      });
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
      map.addLayer({
        id: 'sky',
        type: 'sky',
        paint: {
          'sky-type': 'atmosphere',
          'sky-atmosphere-sun': [0.0, 90.0],
          'sky-atmosphere-sun-intensity': 15
        }
      });

      //Loop through all popup objects
      //Create markers for each popup and add them to the map
      events.forEach((event) => {
        if (
          event.Latitude &&
          event.Longitude &&
          event.Latitude + event.Longitude !== -2
        ) {
          // const ref = createRef<HTMLDivElement | null>();
          const el = document.createElement('div');
          createRoot(el).render(
            <EventCard
              key={event.id}
              eventData={event}
              viewer
              action={() => openModal(event)}
              RSVPEvents={RSVPevents}
              setRSVPEvents={
                setRSVPEvents as React.Dispatch<SetStateAction<number[]>>
              }
              rsvpCount={rsvpCounts[event.id]}
              session={sessionData}
            />
          );
          const popup = new mapboxgl.Popup() // Adjust the offset as needed
            .setMaxWidth('500x')
            .setDOMContent(el);
          new mapboxgl.Marker({
            color: '#7C3AED'
          })
            .setLngLat([event.Latitude, event.Longitude])
            .setPopup(popup)
            .addTo(map);
        }
      });
    });
  }, [events, RSVPevents, rsvpCounts]);

  return (
    <>
      <div
        id="map"
        ref={mapContainer}
        style={{ width: '100%', height: 'calc(100vh - 4rem - 4rem - 2px)' }}
      />
      <EventModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        event={selectedEvent}
        RSVPEvents={RSVPevents as number[]}
        session={sessionData}
        setRSVPEvents={
          setRSVPEvents as React.Dispatch<SetStateAction<number[]>>
        }
        rsvpCount={modelRsvpCount}
      />
    </>
  );
}
/* eslint-enable @typescript-eslint/no-unused-vars */
