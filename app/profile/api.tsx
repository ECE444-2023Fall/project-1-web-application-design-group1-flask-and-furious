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
      const { id, ...profile } = JSON.parse(data)['data'][0];
      profile.profileId = id;
      setProfile(profile);
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
      'Content-Type': 'multipart/form-data',
      Authentication: `Bearer ${session?.access_token}`
    },
    body: requestBody
  };
  await fetch('/api/profiles', requestOptions);
};

export const apiUpdateProfilePicture = async (
  session: Session | null,
  picture: File,
  profileId: string
) => {
  const formData = new FormData();
  formData.append('picture', picture);
  formData.append('profileId', profileId);
  const requestOptions = {
    method: 'PUT',
    headers: {
      Authentication: `Bearer ${session?.access_token}`
    },
    body: formData
  };
  await fetch('/api/profiles/picture', requestOptions);
};
