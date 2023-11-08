import MapBox from '@/components/MapBox';
import { act, render } from '@testing-library/react';
import mapboxgl from 'mapbox-gl';

// Mock the Mapbox library
jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    on: jest.fn(),
    addSource: jest.fn(),
    setTerrain: jest.fn(),
    addLayer: jest.fn()
  })),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn().mockReturnThis(),
    addTo: jest.fn().mockReturnThis(),
    setPopup: jest.fn().mockReturnThis()
  })),
  Popup: jest.fn(() => ({
    setHTML: jest.fn().mockReturnThis()
  }))
}));

describe('MapBox', () => {
  const mockedMapboxglMap = mapboxgl.Map;
  const mockedMapboxglMarker = mapboxgl.Marker;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  //Joshua-Pow
  it('renders without crashing', () => {
    render(<MapBox />);
  });

  //Joshua-Pow
  it('initializes the map', () => {
    act(() => {
      render(<MapBox />);
    });

    expect(mockedMapboxglMap).toHaveBeenCalled();
    expect(mockedMapboxglMap).toHaveBeenCalledWith(
      expect.objectContaining({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
        container: 'map',
        style: 'mapbox://styles/mapbox/standard-beta',
        center: [-79.39486600749379, 43.66027265761257],
        zoom: 16,
        pitch: 60
      })
    );
  });

  //Ardavan-Alaei-Fard
  it('checks the event locations', () => {
    act(() => {
      render(<MapBox />);
    });

    expect(mockedMapboxglMarker).toHaveBeenCalled();
  });
});
