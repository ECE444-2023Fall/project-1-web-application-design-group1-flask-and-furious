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
      accessToken:
        'pk.eyJ1IjoicmFjZWZuIiwiYSI6ImNsbm5pY241ZTA1b3cyd3F6MmxrMmd2aHYifQ.CuLMjRl3fvGDPxX_jGUGjw',
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
  }, []);

  return (
    <div
      id="map"
      ref={mapContainer}
      style={{ width: '100%', height: '100vh' }}
    />
  );
}

export default MapBox;
