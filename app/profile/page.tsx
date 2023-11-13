'use client';

import PersonalInfo from '@/components/PersonalInfo';
import ProfilePhoto from '@/components/ProfilePhoto';
import Tags from '@/components/Tags';
import { toast } from '@/components/ui/use-toast';
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

  const [age, setAge] = useState<ProfileData['age']>(null);
  const [gender, setGender] = useState<ProfileData['gender']>(null);
  const [city, setCity] = useState<ProfileData['city']>(null);
  const [university, setUniversity] = useState<ProfileData['university']>(null);
  const [program, setProgram] = useState<ProfileData['program']>(null);

  const [profile, setProfile] = useState<ProfileData | null>(null);

  const [selectedTags, setSelectedTags] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const getTags = async () => {
      const { data } = await supabase.from('Tags').select();

      if (data) {
        const sortedTags = data.sort((a, b) => a.tag.localeCompare(b.tag));
        setSelectedTags(
          Object.fromEntries(sortedTags.map((tag) => [tag.tag, false]))
        );
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
    apiGetProfile(awaitedSession, {
      userUuid: await userUuidFromSession(awaitedSession, supabase)
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to get profile');
        }
        const resp = await res.json();
        const { id, ...profile } = JSON.parse(resp)['data'][0];
        profile.profileId = id;
        setProfile(profile);
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: 'Failed to Get Profile',
          description: 'Something went wrong. Please try again later'
        });
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

    if (profile.tags) {
      (profile.tags as string[]).forEach((tag) => {
        setSelectedTags((prev) => ({ ...prev, [tag]: true }));
      });
    }
  }, [profile]);

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEditClick = () => {
    setProfileEdit(true);
  };

  const updateProfile = async (formData: ProfileData) => {
    await apiUpdateProfile((await session).data.session, formData).then(
      (response) => {
        if (response.ok) {
          getProfile();
          toast({
            title: 'Profile Updated Successfully'
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Profile Update Failed',
            description: 'Something went wrong. Please try again later'
          });
        }
      }
    );
  };

  const onSaveClick = async () => {
    try {
      if (!profile) {
        throw new Error('Profile is null');
      }

      const tags = Object.keys(selectedTags).filter((tag) => selectedTags[tag]);

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
      getProfile();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error saving profile:', error);
    }
  };

  const onFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.includes('image') && profile) {
      await apiUpdateProfilePicture(
        (await session).data.session,
        file,
        profile.profileId
      ).then((response) => {
        if (response.ok) {
          toast({
            title: 'Profile Picture Updated Successfully',
            description:
              'Your profile picture will be updated in a few minutes.'
          });
        } else {
          toast({
            variant: 'destructive',
            title: 'Profile Picture Update Failed',
            description: 'Something went wrong. Please try again later'
          });
        }
      });
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
            </div>
            <div className="flex basis-3/4 flex-col">
              <div className="mt-4 flex h-60 flex-col rounded-lg border-2 border-primary bg-white">
                <p className="ml-4 mt-2 basis-1/4 text-3xl font-semibold text-primary">
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
              <div className="mt-8 flex flex-col rounded-lg border-2 border-primary bg-white">
                <p className="ml-4 mt-2 basis-1/6 text-3xl font-semibold text-primary">
                  Help us guide you in the right direction!
                </p>
                <p className="ml-4 mt-2 basis-1/6 text-2xl font-semibold text-primary">
                  Add your preferences below (Ctrl + Click to Select Multiple
                  Tags):
                </p>
                <div className="pl-4 pr-1">
                  <Tags
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                  />
                </div>

                <div className="mb-2 flex flex-grow basis-1/4 items-end justify-end rounded-b-lg pt-4">
                  <button
                    className="mr-2 rounded bg-purple-700 px-4 py-2 pt-2 text-white hover:bg-purple-900"
                    onClick={onSaveClick}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid h-full w-full place-content-center">
          <svg
            aria-hidden="true"
            className="inline h-20 w-20 animate-spin fill-purple-600 text-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
