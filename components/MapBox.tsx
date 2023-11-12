'use client';
import { apiGetEvents } from '@/app/events/api';
import { EventData } from '@/app/events/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import EventCard from './EventCard';

// this is where all of our map logic is going to live
// adding the empty dependency array ensures that the map
// is only created once
/* eslint-disable @typescript-eslint/no-unused-vars */
async function checkLink(url: string): Promise<boolean> {
  const response = await fetch(url);
  // Check if the response status is in the range 200-299
  if (response.ok) {
    return true;
  } else {
    return false;
  }
}

export default function MapBox() {
  const mapContainer = useRef(null);

  const supabase = createClientComponentClient();
  const session = supabase.auth.getSession();

  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getEvents = async () => {
    setLoading(true);
    await apiGetEvents((await session).data.session, setEvents, {});
    setLoading(false);
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    // create the map and configure it
    // check out the API reference for more options
    // https://docs.mapbox.com/mapbox-gl-js/api/map/
    const map = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      container: 'map',
      style: 'mapbox://styles/mapbox/standard-beta',
      center: [-79.39486600749379, 43.66027265761257],
      zoom: 14,
      pitch: 60
    });

    map.on('load', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (map as any).setConfigProperty('basemap', 'lightPreset', 'dusk');
      map.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
        tileSize: 512,
        maxzoom: 16
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
    });

    const markerHeight = 50;
    const markerRadius = 10;
    const linearOffset = 25;

    events.forEach((event) => {
      if (
        event.Latitude !== undefined &&
        event.Longitude !== undefined &&
        event.Latitude + event.Longitude !== -2
      ) {
        let event_image = '';
        const check = checkLink(event.image_url).then((result) => {
          if (result) {
            event_image = event.image_url;
          } else {
            event_image =
              'https://yqrgbzoauzaaznsztnwb.supabase.co/storage/v1/object/public/Images/no-image';
          }
          const eventCardHtml = renderToStaticMarkup(
            <EventCard eventData={{ ...event, image_url: event_image }} />
          );
          const popup = new mapboxgl.Popup({
            offset: {
              top: [0, 0],
              'top-left': [0, 0],
              'top-right': [0, 0],
              bottom: [0, -markerHeight],
              'bottom-left': [
                linearOffset,
                (markerHeight - markerRadius + linearOffset) * -2
              ],
              'bottom-right': [
                -linearOffset,
                (markerHeight - markerRadius + linearOffset) * -2
              ],
              left: [markerRadius, (markerHeight - markerRadius) * -2],
              right: [-markerRadius, (markerHeight - markerRadius) * -2]
            }
          }) // Adjust the offset as needed
            .setMaxWidth('500x')
            .setHTML(eventCardHtml);

          new mapboxgl.Marker()
            .setLngLat([event.Longitude, event.Latitude])
            .addTo(map)
            .setPopup(popup);
        });
      }
    });
  }, [events]);

  return (
    <div
      id="map"
      ref={mapContainer}
      // className="h-[calc(100vh-4rem)]] w-full"
      style={{ width: '100%', height: 'calc(100vh - 4rem - 4rem)' }}
    />
  );
}
/* eslint-enable @typescript-eslint/no-unused-vars */
