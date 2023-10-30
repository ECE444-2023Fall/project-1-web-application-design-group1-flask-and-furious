import { Session } from '@supabase/gotrue-js';
import { Dispatch, SetStateAction } from 'react';
import { EventData, formData } from './event.helpers';

export const Get = async (
  session: Session | null,
  setEvents: Dispatch<SetStateAction<EventData[]>>
) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${session?.access_token}`
    }
  };
  fetch('/api/events', requestOptions)
    .then((res) => res.json())
    .then((data) => {
      setEvents(JSON.parse(data)['data']);
    });
};

export const Post = async (session: Session | null, formData: formData) => {
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
