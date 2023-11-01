import { Session } from '@supabase/gotrue-js';
import { Dispatch, SetStateAction } from 'react';
import { EventData, formData } from './types';

export const apiGetEvents = async (
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

export const apiCreateEvent = async (
  session: Session | null,
  formData: formData
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
  formData: formData
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
  formData: formData
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
