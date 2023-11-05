import { Session } from '@supabase/gotrue-js';
import { Dispatch, SetStateAction } from 'react';
import { EventData } from './types';

export const apiGetEvents = async (
  session: Session | null,
  setEvents: Dispatch<SetStateAction<EventData[] | null>>,
  params: {
    userUuid?: string;
  }
) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${session?.access_token}`
    }
  };
  fetch('/api/events?' + new URLSearchParams(params), requestOptions)
    .then((res) => res.json())
    .then((data) => {
      const jsonData = JSON.parse(data)['data'];
      const reNamedIds = jsonData.map(
        (event: Database['public']['Tables']['Events']['Row']) => {
          return {
            eventId: event.id,
            title: event.Title,
            owner: event.Owner,
            description: event.Description,
            location: event.Location,
            startTime: event.StartTime,
            endTime: event.EndTime,
            date: event.Date,
            frequency: event.Frequency,
            tags: event.Tags
          } as EventData;
        }
      );
      setEvents(reNamedIds);
    });
};

export const apiCreateEvent = async (
  session: Session | null,
  formData: EventData
) => {
  try {
    const requestBody = JSON.stringify(formData);
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: `Bearer ${session?.access_token}`
      },
      body: requestBody
    };
    await fetch('/api/events', requestOptions);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching events: ', error);
  }
};

export const apiUpdateEvent = async (
  session: Session | null,
  formData: EventData
) => {
  const requestBody = JSON.stringify(formData);
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${session?.access_token}`
    },
    body: requestBody
  };
  await fetch(`/api/events`, requestOptions);
};

export const apiDeleteEvent = async (
  session: Session | null,
  formData: EventData
) => {
  const requestBody = JSON.stringify(formData);
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${session?.access_token}`
    },
    body: requestBody
  };
  await fetch(`/api/events`, requestOptions);
};
