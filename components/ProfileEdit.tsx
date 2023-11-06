import { ProfileData } from '@/app/profile/types';

type Props = {
  age: ProfileData['age'];
  setAge: (age: ProfileData['age']) => void;
  gender: ProfileData['gender'];
  setGender: (gender: ProfileData['gender']) => void;
  city: ProfileData['city'];
  setCity: (city: ProfileData['city']) => void;
  university: ProfileData['university'];
  setUniversity: (university: ProfileData['university']) => void;
  program: ProfileData['program'];
  setProgram: (program: ProfileData['program']) => void;
};

const ageOptions = [
  null,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30
] as const;

const genderOptions = ['', 'Male', 'Female', 'Non-Binary', 'Other'] as const;

const cityOptions = ['', 'Toronto', 'Mississauga', 'Scarborough'] as const;

const universityOptions = [
  '',
  'University of Toronto',
  'Toronto Metropolitan University',
  'York University'
] as const;

const programOptions = [
  '',
  'Computer Science',
  'Engineering',
  'Life Sciences'
] as const;

export default function ProfileEdit({
  age,
  setAge,
  gender,
  setGender,
  city,
  setCity,
  university,
  setUniversity,
  program,
  setProgram
}: Props) {
  return (
    <div className="ml-2 mt-3 flex flex-grow basis-2/4">
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="text-2xl font-semibold">Age</p>
        <div className="min-w-0 max-w-full">
          <select
            value={age ?? undefined}
            onChange={(e) => setAge(Number(e.target.value))}
            className="mt-2 max-w-full rounded-md border-2 border-gray-300 p-1 text-lg"
          >
            {ageOptions.map((option) => (
              <option key={option} value={option ?? undefined}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="text-2xl font-semibold">Gender</p>
        <div className="min-w-0 max-w-full">
          <select
            value={gender ?? undefined}
            onChange={(e) => setGender(e.target.value)}
            className="mt-2 max-w-full rounded-md border-2 border-gray-300 p-1 text-lg"
          >
            {genderOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="text-2xl font-semibold">City</p>
        <div className="min-w-0 max-w-full">
          <select
            value={city ?? undefined}
            onChange={(e) => setCity(e.target.value)}
            className="mt-2 max-w-full rounded-md border-2 border-gray-300 p-1 text-lg"
          >
            {cityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="text-2xl font-semibold">University</p>
        <div className="min-w-0 max-w-full">
          <select
            value={university ?? undefined}
            onChange={(e) => setUniversity(e.target.value)}
            className="mt-2 max-w-full rounded-md border-2 border-gray-300 p-1 text-lg"
          >
            {universityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="text-2xl font-semibold">Program</p>
        <div className="min-w-0 max-w-full">
          <select
            value={program ?? undefined}
            onChange={(e) => setProgram(e.target.value)}
            className="mt-2 max-w-full rounded-md border-2 border-gray-300 p-1 text-lg"
          >
            {programOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
