import { Session } from '@supabase/gotrue-js';
import { Dispatch, SetStateAction } from 'react';
import { EventData, formData } from './types';

export const apiGetEvents = async (
  session: Session | null,
  setEvents: Dispatch<SetStateAction<EventData[]>>,
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
      setEvents(JSON.parse(data)['data']);
    });
};

export const apiCreateEvent = async (
  session: Session | null,
  formData: FormData
) => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authentication: `Bearer ${session?.access_token}`
      },
      body: formData
    };
    const response = await fetch(`/api/events`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error updating event: ', error);
  }
};

export const apiUpdateEvent = async (
  session: Session | null,
  formData: FormData // NOTE: different from formData - "multipart/form-data"
) => {
  try {
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authentication: `Bearer ${session?.access_token}`
      },
      body: formData
    };
    const response = await fetch(`/api/events`, requestOptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error updating event: ', error);
  }
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
