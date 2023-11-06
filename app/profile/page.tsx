'use client';
import ProfileDisplay from '@/components/ProfileDisplay';
import ProfileEdit from '@/components/ProfileEdit';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { userUuidFromSession } from '../events/helpers';
import { apiGetProfile, apiUpdateProfile } from './api';
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

  const getProfile = async () => {
    if (!(await session).data?.session) {
      router.push('/login');
      return;
    }

    const awaitedSession = (await session).data.session;
    apiGetProfile(awaitedSession, setProfile, {
      userUuid: await userUuidFromSession(awaitedSession, supabase)
    });
  };

  useEffect(() => {
    if (!profile) {
      return;
    }
    setAge(profile.age);
    setGender(profile.gender);
    setCity(profile.city);
    setUniversity(profile.university);
    setProgram(profile.program);
  }, [profile]);

  useEffect(() => {
    getProfile();
  }, []);

  const onEditClick = () => {
    setProfileEdit(true);
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

  const saveButton = async () => {
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
        program: program
      };

      setProfile(updatedProfile);
      await updateProfile(updatedProfile);
      setProfileEdit(false);
      getProfile();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error saving profile:', error);
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
            <div className="flex h-full basis-1/4 flex-col p-4">
              <div className="h-80 w-80 self-center rounded-full border-8 border-purple-700 bg-white"></div>
              <button className="mx-16 mt-4 rounded bg-purple-700 px-4 py-2 text-white hover:bg-purple-900">
                Edit Profile Picture
              </button>
            </div>
            <div className="flex basis-3/4 flex-col">
              <div className="mt-4 flex h-60 flex-col rounded-lg border-2 border-purple-700 bg-white">
                <div className="basis-1/4">
                  <p className="ml-4 mt-2 text-3xl font-semibold text-purple-700">
                    Personal Information
                  </p>
                </div>
                {profileEdit ? (
                  <>
                    <ProfileEdit
                      age={age}
                      setAge={setAge}
                      gender={gender}
                      setGender={setGender}
                      city={city}
                      setCity={setCity}
                      university={university}
                      setUniversity={setUniversity}
                      program={program}
                      setProgram={setProgram}
                    />
                    <div className="mt-10 flex flex-grow basis-1/4 items-center justify-end rounded-b-lg">
                      <button
                        className="mr-2 rounded bg-purple-700 px-4 py-2 text-white hover:bg-purple-900"
                        onClick={saveButton}
                      >
                        Save
                      </button>
                      <button
                        className="mr-2 rounded bg-purple-700 px-4 py-2 text-white hover:bg-purple-900"
                        onClick={() => setProfileEdit(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <ProfileDisplay
                      age={profile.age}
                      gender={profile.gender}
                      city={profile.city}
                      university={profile.university}
                      program={profile.program}
                    />
                    <div className="mt-10 flex flex-grow basis-1/4 items-center justify-end rounded-b-lg">
                      <button
                        className=" mr-2 rounded bg-purple-700 px-4 py-2 text-white hover:bg-purple-900"
                        onClick={onEditClick}
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-8 flex h-48 flex-col rounded-lg border-2 border-purple-700 bg-white">
                <div className="basis-1/6">
                  <p className="ml-4 mt-2 text-3xl font-semibold text-purple-700">
                    Help us guide you in the right direction!
                  </p>
                </div>
                <div className="basis-1/6">
                  <p className="ml-4 mt-2 text-3xl font-semibold text-purple-700">
                    Add your preferences below:
                  </p>
                </div>
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
