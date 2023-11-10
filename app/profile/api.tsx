import { Session } from '@supabase/gotrue-js';
import { Dispatch, SetStateAction } from 'react';
import { ProfileData } from './types';

export const apiGetProfile = async (
  session: Session | null,
  setProfile: Dispatch<SetStateAction<ProfileData | null>>,
  params: {
    userUuid?: string;
  }
) => {
  return fetch('/api/profiles?' + new URLSearchParams(params), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${session?.access_token}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      const { id, ...profile } = JSON.parse(data)['data'][0];
      profile.profileId = id;
      setProfile(profile);
    });
};

export const apiUpdateProfile = async (
  session: Session | null,
  profileData: ProfileData
) => {
  return fetch('/api/profiles', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${session?.access_token}`
    },
    body: JSON.stringify(profileData)
  });
};

export const apiUpdateProfilePicture = async (
  session: Session | null,
  picture: File,
  profileId: string
) => {
  const formData = new FormData();
  formData.append('picture', picture);
  formData.append('profileId', profileId);
  return fetch('/api/profiles/picture', {
    method: 'PUT',
    headers: {
      Authentication: `Bearer ${session?.access_token}`
    },
    body: formData
  });
};
