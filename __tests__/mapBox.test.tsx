import MapBox from '@/components/MapBox';
import { act, render } from '@testing-library/react';
import mapboxgl from 'mapbox-gl';

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: () => ({
    auth: {
      getSession: jest.fn(async () => ({
        data: {
          session: {
            user: {
              id: 'user-123',
              email: 'user@example.com'
            },
            accessToken: 'mock_access_token'
          }
        },
        error: null
      }))
    },
    from: () => ({
      select: jest.fn(async () => ({
        data: [
          { id: 1, tag: 'tag1' },
          { id: 2, tag: 'tag2' }
        ],
        error: null
      }))
    })
  })
}));

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
  const mockedMapboxglPopup = mapboxgl.Popup;

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

  //Ardavan-Alaei-Fard
  it('checks the event locations', () => {
    act(() => {
      render(<MapBox />);
    });

    expect(mockedMapboxglMarker).toHaveBeenCalled();
    expect(mockedMapboxglMarker).toHaveBeenCalledWith(
      expect.objectContaining({
        setLngLat: [-79.394718, 43.659885],
        setPopup: mockedMapboxglPopup
      })
    );
  });

  //Ardavan-Alaei-Fard
  it('checks the event details', () => {
    act(() => {
      render(<MapBox />);
    });

    expect(mockedMapboxglPopup).toHaveBeenCalled();
  });
});
