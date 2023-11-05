import { Session } from '@supabase/gotrue-js';
import { Dispatch, SetStateAction } from 'react';
import { ProfileData } from './types';

export const apiGetProfile = async (
  session: Session | null,
  setName: Dispatch<SetStateAction<ProfileData>>,
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
  fetch('/api/profiles?' + new URLSearchParams(params), requestOptions)
    .then((res) => res.json())
    .then((data) => {
      setName(JSON.parse(data)['data'][0]);
    });
};

export const apiUpdateProfile = async (
  session: Session | null,
  profileData: ProfileData
) => {
  const requestBody = JSON.stringify(profileData);
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${session?.access_token}`
    },
    body: requestBody
  };
  await fetch('/api/profiles', requestOptions);
};
