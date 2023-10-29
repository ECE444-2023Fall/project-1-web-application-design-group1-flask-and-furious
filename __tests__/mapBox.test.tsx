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
  }))
}));

describe('MapBox', () => {
  const mockedMapboxglMap = mapboxgl.Map;

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

    expect(mockedMapboxglMap).toHaveBeenCalledTimes(1);
    expect(mockedMapboxglMap).toHaveBeenCalledWith(
      expect.objectContaining({
        accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
        container: 'map',
        style: 'mapbox://styles/mapbox/standard-beta',
        center: [-79.39486600749379, 43.66027265761257],
        zoom: 14,
        pitch: 60
      })
    );
  });
});
