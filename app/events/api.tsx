import { Session } from '@supabase/gotrue-js';
import { Dispatch, SetStateAction } from 'react';
import { formData } from './types';

export const apiGetEvents = async (
  session: Session | null,
  params: {
    userUuid?: string;
  }
) =>
  fetch('/api/events?' + new URLSearchParams(params), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${session?.access_token}`
    }
  });

export const apiCreateEvent = async (
  session: Session | null,
  formData: FormData
) =>
  fetch(`/api/events`, {
    method: 'POST',
    headers: {
      Authentication: `Bearer ${session?.access_token}`
    },
    body: formData
  });

export const apiUpdateEvent = async (
  session: Session | null,
  formData: FormData // NOTE: different from formData - "multipart/form-data"
) =>
  fetch(`/api/events`, {
    method: 'PUT',
    headers: {
      Authentication: `Bearer ${session?.access_token}`
    },
    body: formData
  });

export const apiDeleteEvent = async (
  session: Session | null,
  formData: formData
) =>
  fetch(`/api/events`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${session?.access_token}`
    },
    body: JSON.stringify(formData)
  });

export const apiGetRSVPEvents = async (
  session: Session | null,
  setRSVPEvents: Dispatch<SetStateAction<number[]>>,
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
  fetch('/api/rsvp?' + new URLSearchParams(params), requestOptions)
    .then((res) => res.json())
    .then((data) => {
      setRSVPEvents(JSON.parse(data)['data'][0]['events']);
    });
};

export const apiUpdateRSVPEvents = async (
  session: Session | null,
  params: {
    userUuid?: string;
    eventId?: string;
  }
) => {
  return fetch('/api/rsvp?' + new URLSearchParams(params), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${session?.access_token}`
    }
  });
};
