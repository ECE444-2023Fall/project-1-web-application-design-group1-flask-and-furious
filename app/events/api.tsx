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
  formData: FormData // This should remain as FormData
) => {
  try {
    // Prepare the request options, including the request headers
    const requestOptions = {
      method: 'PUT', // This should match the HTTP method expected by your API for an update operation
      headers: {
        // 'Content-Type': 'application/json' should not be set when sending FormData
        // The browser will automatically set the 'Content-Type' to 'multipart/form-data'
        // with the correct boundary when sending FormData.
        Authorization: `Bearer ${session?.access_token}` // Use 'Authorization', not 'Authentication'
      },
      body: formData // Send the FormData object directly
    };

    // Make the fetch request to the API endpoint
    const response = await fetch(`/api/events`, requestOptions);

    // You can check the response status and handle accordingly
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
