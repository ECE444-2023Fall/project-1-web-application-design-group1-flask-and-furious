import { Session } from '@supabase/gotrue-js';
import { ProfileData } from './types';

export const apiGetProfile = async (
  session: Session | null,
  params: {
    userUuid?: string;
  }
) =>
  fetch('/api/profiles?' + new URLSearchParams(params), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${session?.access_token}`
    }
  });

export const apiUpdateProfile = async (
  session: Session | null,
  profileData: ProfileData
) =>
  fetch('/api/profiles', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authentication: `Bearer ${session?.access_token}`
    },
    body: JSON.stringify(profileData)
  });

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
