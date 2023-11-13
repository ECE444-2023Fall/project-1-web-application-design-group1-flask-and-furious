import { Session } from '@supabase/gotrue-js';
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
  params: {
    userUuid?: string;
  }
) => {
  return fetch('/api/rsvp?' + new URLSearchParams(params), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${session?.access_token}`
    }
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

export const apiGetRSVPCounts = async (session: Session | null) =>
  fetch('/api/rsvp/count', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${session?.access_token}`
    }
  });
