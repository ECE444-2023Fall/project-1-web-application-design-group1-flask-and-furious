'use client';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import EventCard from './EventCard';
import TimeOfDaySelector from './TimeOfDaySelector';

const timesOfDay = ['day', 'dusk', 'dawn', 'night'] as const;

export type TimeOfDay = (typeof timesOfDay)[number];

function MapBox() {
  const [selectedTime, setSelectedTime] = useState<TimeOfDay>('day'); // ['day', 'dusk', 'dawn', 'night'
  const mapContainer = useRef(null);

  // this is where all of our map logic is going to live
  // adding the empty dependency array ensures that the map
  // is only created once

  useEffect(() => {
    // create the map and configure it
    // check out the API reference for more options
    // https://docs.mapbox.com/mapbox-gl-js/api/map/
    const map = new mapboxgl.Map({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      container: 'map',
      style: 'mapbox://styles/mapbox/standard-beta',
      center: [-79.39486600749379, 43.66027265761257],
      zoom: 16,
      pitch: 60
    });

    const event_location: [number, number][] = [
      [-79.39486600749379, 43.66027265761257],
      [-79.3959892, 43.659543],
      [-79.3894661, 43.6671491]
    ]; // Three example locations for the events

    const event_details = {
      eventId: 12,
      eventName: 'test',
      eventDescription: "it's gonna be so fun",
      eventDate: 'Nov 6, 2023',
      eventTime: '4 to 6 pm',
      eventLocation: 'bahen',
      eventTags: ['fun', 'eng', 'alcoholic drinks']
    };

    map.on('load', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (map as any).setConfigProperty('basemap', 'lightPreset', selectedTime);
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

    // Adding markers for the events
    /* eslint-disable @typescript-eslint/no-unused-vars */
    for (let i = 0; i < event_location.length; i++) {
      const eventCardHtml = renderToStaticMarkup(
        <EventCard eventImage={''} {...event_details} />
      );
      const popup = new mapboxgl.Popup({ offset: 25 }) // Adjust the offset as needed
        .setHTML(eventCardHtml);
      new mapboxgl.Marker()
        .setLngLat(event_location[i] as [number, number])
        .addTo(map)
        .setPopup(popup);
    }
  }, [selectedTime]);

  useEffect(() => {
    const timeOfDay = new Date().getHours();
    //Dawn: 5:01 - 7:00
    //Day: 7:01 - 17:00
    //Dusk: 17:01 - 19:00
    //Night: 19:01 - 5:00

    //Depedning on the time of day, the map will change
    if (timeOfDay >= 5 && timeOfDay <= 7) {
      setSelectedTime('dawn');
    } else if (timeOfDay > 7 && timeOfDay < 17) {
      setSelectedTime('day');
    } else if (timeOfDay >= 17 && timeOfDay <= 19) {
      setSelectedTime('dusk');
    } else {
      setSelectedTime('night');
    }
  }, []);

  return (
    <>
      <div
        id="map"
        ref={mapContainer}
        style={{
          width: '100%',
          height: 'calc(100vh - 4rem - 4rem)'
        }}
      />
      <TimeOfDaySelector
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
    </>
  );
}

export default MapBox;
