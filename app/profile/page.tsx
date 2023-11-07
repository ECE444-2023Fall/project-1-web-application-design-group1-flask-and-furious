'use client';

import PersonalInfo from '@/components/PersonalInfo';
import PersonalTags from '@/components/PersonalTags';
import ProfilePhoto from '@/components/ProfilePhoto';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { userUuidFromSession } from '../events/helpers';
import {
  apiGetProfile,
  apiUpdateProfile,
  apiUpdateProfilePicture
} from './api';
import { ProfileData } from './types';

export default function Profile() {
  const supabase = createClientComponentClient();
  const session = supabase.auth.getSession();
  const router = useRouter();

  const [profileEdit, setProfileEdit] = useState(false);
  const [profileTagsEdit, setProfileTagsEdit] = useState(false);

  const [age, setAge] = useState<ProfileData['age']>(null);
  const [gender, setGender] = useState<ProfileData['gender']>(null);
  const [city, setCity] = useState<ProfileData['city']>(null);
  const [university, setUniversity] = useState<ProfileData['university']>(null);
  const [program, setProgram] = useState<ProfileData['program']>(null);
  const [tags, setTags] = useState<ProfileData['tags']>(null);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [uploadMessage, setUploadMessage] = useState('');

  const [tagOptions, setTagOptions] = useState<string[]>([]);

  useEffect(() => {
    const getTags = async () => {
      const { data } = await supabase.from('Tags').select();

      if (data) {
        const tagList = data.map((item) => item.tag);
        setTagOptions(tagList);
      }
    };
    getTags();
  }, [supabase]);

  const getProfile = useCallback(async () => {
    if (!(await session).data?.session) {
      router.push('/login');
      return;
    }

    const awaitedSession = (await session).data.session;
    apiGetProfile(awaitedSession, setProfile, {
      userUuid: await userUuidFromSession(awaitedSession, supabase)
    });
  }, [router, session, supabase]);

  useEffect(() => {
    if (!profile) {
      return;
    }
    setAge(profile.age);
    setGender(profile.gender);
    setCity(profile.city);
    setUniversity(profile.university);
    setProgram(profile.program);
    setTags(profile.tags);
  }, [profile]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const onEditClick = () => {
    setProfileEdit(true);
  };

  const onTagsEditClick = () => {
    setProfileTagsEdit(true);
  };

  const updateProfile = async (formData: ProfileData) => {
    try {
      await apiUpdateProfile((await session).data.session, formData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating profile:', error);
    }
    getProfile();
  };

  const onSaveClick = async () => {
    try {
      if (!profile) {
        throw new Error('Profile is null');
      }

      const updatedProfile = {
        ...profile,
        age: age,
        gender: gender,
        city: city,
        university: university,
        program: program,
        tags: tags
      };

      await setProfile(updatedProfile);
      await updateProfile(updatedProfile);
      setProfileEdit(false);
      setProfileTagsEdit(false);
      getProfile();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error saving profile:', error);
    }
  };

  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.includes('image') && profile) {
      setUploadMessage(
        'Your profile picture will be updated in a few minutes.'
      );

      try {
        await apiUpdateProfilePicture(
          (await session).data.session,
          file,
          profile.profileId
        );

        setTimeout(() => setUploadMessage(''), 3000);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error uploading profile picture:', error);
        setUploadMessage('Failed to upload picture.');
      }
    }
  };

  return (
    <div className="m-4 flex h-screen flex-col">
      {profile ? (
        <>
          <div className="mb-4 flex h-24 items-center justify-center">
            <span className="text-7xl font-bold">
              {profile.first_name} {profile.last_name}&apos;s Profile
            </span>
          </div>

          <div className="flex flex-grow space-x-4">
            <div className="flex h-full basis-1/4 flex-col items-center p-4">
              <ProfilePhoto
                url={profile.pictureUrl}
                onFileUpload={onFileUpload}
              />
              {uploadMessage && (
                <div className="mt-4 rounded-md bg-violet-600 p-2 text-center text-white">
                  {uploadMessage}
                </div>
              )}
            </div>
            <div className="flex basis-3/4 flex-col">
              <div className="mt-4 flex h-60 flex-col rounded-lg border-2 border-violet-600 bg-white">
                <p className="ml-4 mt-2 basis-1/4 text-3xl font-semibold text-violet-600">
                  Personal Information
                </p>
                <PersonalInfo
                  edit={profileEdit}
                  setEdit={setProfileEdit}
                  age={age}
                  setAge={setAge}
                  city={city}
                  setCity={setCity}
                  gender={gender}
                  setGender={setGender}
                  program={program}
                  setProgram={setProgram}
                  university={university}
                  setUniversity={setUniversity}
                  onSaveClick={onSaveClick}
                  onEditClick={onEditClick}
                />
              </div>
              <div className="mt-8 flex h-60 flex-col rounded-lg border-2 border-violet-600 bg-white">
                <p className="ml-4 mt-2 basis-1/6 text-3xl font-semibold text-violet-600">
                  Help us guide you in the right direction!
                </p>
                <p className="ml-4 mt-2 basis-1/6 text-2xl font-semibold text-violet-600">
                  Add your preferences below:
                </p>
                <PersonalTags
                  edit={profileTagsEdit}
                  setEdit={setProfileTagsEdit}
                  tags={tags}
                  setTags={setTags}
                  onSaveClick={onSaveClick}
                  onEditClick={onTagsEditClick}
                  tagOptions={tagOptions}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
