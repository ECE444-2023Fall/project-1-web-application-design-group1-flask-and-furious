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

  const [ProfileInfoEdit, setProfileInfoEdit] = useState(false);

  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('0');
  const [city, setCity] = useState('0');
  const [university, setUniversity] = useState('0');
  const [program, setProgram] = useState('0');

  const initialProfileState: ProfileData = {
    first_name: '',
    last_name: '',
    Age: 0,
    Gender: '',
    City: '',
    University: '',
    Program: ''
  };
  const [profile, setProfile] = useState<ProfileData>(initialProfileState);

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
    getProfile();
  });

  const editButton = () => {
    setAge(profile.Age);
    setGender(profile.Gender);
    setCity(profile.City);
    setUniversity(profile.University);
    setProgram(profile.Program);
    setProfileInfoEdit((EditMode) => !EditMode);
  };

  const updateProfile = async (formData: ProfileData) => {
    try {
      await apiUpdateProfile((await session).data.session, formData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating profile:', error);
    }
  };
  const saveButton = async () => {
    const updatedProfile = {
      ...profile,
      Age: age,
      Gender: gender,
      City: city,
      University: university,
      Program: program
    };

    try {
      await setProfile(updatedProfile);
      await updateProfile(updatedProfile);
      setProfileInfoEdit((EditMode) => !EditMode);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="m-4 flex h-screen flex-col">
      <div className="mb-4 flex h-24 w-full items-center justify-center">
        <p className="text-7xl font-bold">
          {profile.first_name !== '' ? (
            <>
              {profile.first_name} {profile.last_name}`&apos`s Profile
            </>
          ) : null}
        </p>
      </div>

      <div className="flex w-full flex-grow space-x-4">
        <div className="flex h-full basis-1/4 flex-col p-4">
          <div className="h-80 w-80 self-center rounded-full border-8 border-purple-700 bg-white"></div>
          <button className="mx-16 mt-4 rounded bg-purple-700 px-4 py-2 text-white hover:bg-purple-900">
            Edit Profile Picture
          </button>
        </div>
        <div className="flex basis-3/4 flex-col">
          <div className="mt-4 flex h-60 w-full flex-col rounded-lg border-2 border-purple-700 bg-white">
            <div className="basis-1/4">
              <p className="ml-4 mt-2 text-3xl font-semibold text-purple-700">
                Personal Information
              </p>
            </div>
            {ProfileInfoEdit ? (
              <div>
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
                    onClick={() => setProfileInfoEdit((EditMode) => !EditMode)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <ProfileDisplay
                  age={profile.Age !== 0 ? profile.Age : undefined}
                  gender={profile.Gender}
                  city={profile.City}
                  university={profile.University}
                  program={profile.Program}
                />
                <div className="mt-10 flex flex-grow basis-1/4 items-center justify-end rounded-b-lg">
                  <button
                    className=" mr-2 rounded bg-purple-700 px-4 py-2 text-white hover:bg-purple-900"
                    onClick={editButton}
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="mt-8 flex h-48 w-full flex-col rounded-lg border-2 border-purple-700 bg-white">
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
    </div>
  );
}
