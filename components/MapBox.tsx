'use client';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

// this is where all of our map logic is going to live
// adding the empty dependency array ensures that the map
// is only created once

function MapBox() {
  const mapContainer = useRef(null);

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

    const event_location = [
      [-79.39486600749379, 43.66027265761257],
      [-79.3959892, 43.659543],
      [-79.3894661, 43.6671491]
    ]; // Three example locations for the events

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

    // Adding markers for the events
    /* eslint-disable @typescript-eslint/no-unused-vars */
    for (let i = 0; i < event_location.length; i++) {
      const marker = new mapboxgl.Marker()
        .setLngLat(event_location[i])
        .addTo(map);
    }
    /* eslint-enable @typescript-eslint/no-unused-vars */
  }, []);

  return (
    <div
      id="map"
      ref={mapContainer}
      // className="h-[calc(100vh-4rem)]] w-full"
      style={{ width: '100%', height: 'calc(100vh - 4rem - 4rem)' }}
    />
  );
}

export default MapBox;
