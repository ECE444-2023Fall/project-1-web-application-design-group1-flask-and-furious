import { ProfileData } from '@/app/profile/types';

type Props = {
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
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
  onSaveClick: () => void;
  onEditClick: () => void;
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

const PersonalInfo = ({
  edit,
  setEdit: setProfileEdit,
  age,
  setAge,
  gender,
  setGender,
  city,
  setCity,
  university,
  setUniversity,
  program,
  setProgram,
  onSaveClick,
  onEditClick
}: Props) => {
  return (
    <>
      <div className="ml-2 mt-3 flex flex-grow basis-2/4">
        <div className="m-2 flex flex-grow flex-col rounded bg-white">
          <p className="text-2xl font-semibold">Age</p>
          {edit ? (
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
          ) : (
            <p className="mt-1 text-lg">{age}</p>
          )}
        </div>
        <div className="m-2 flex flex-grow flex-col rounded bg-white">
          <p className="text-2xl font-semibold">Gender</p>
          {edit ? (
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
          ) : (
            <p className="mt-1 text-lg">{gender}</p>
          )}
        </div>
        <div className="m-2 flex flex-grow flex-col rounded bg-white">
          <p className="text-2xl font-semibold">City</p>
          {edit ? (
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
          ) : (
            <p className="mt-1 text-lg">{city}</p>
          )}
        </div>
        <div className="m-2 flex flex-grow flex-col rounded bg-white">
          <p className="text-2xl font-semibold">University</p>
          {edit ? (
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
          ) : (
            <p className="mt-1 text-lg">{university}</p>
          )}
        </div>
        <div className="m-2 flex flex-grow flex-col rounded bg-white">
          <p className="text-2xl font-semibold">Program</p>
          {edit ? (
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
          ) : (
            <p className="mt-1 text-lg">{program}</p>
          )}
        </div>
      </div>
      <div className="mb-2 flex flex-grow basis-1/4 items-end justify-end rounded-b-lg">
        {edit ? (
          <>
            <button
              className="mr-2 rounded bg-primary px-4 py-2 text-white hover:bg-primary/80"
              onClick={onSaveClick}
            >
              Save
            </button>
            <button
              className="mr-2 rounded bg-primary px-4 py-2 text-white hover:bg-primary/80"
              onClick={() => setProfileEdit(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className=" mr-2 rounded bg-primary px-4 py-2 text-white hover:bg-primary/80"
            onClick={onEditClick}
          >
            Edit
          </button>
        )}
      </div>
    </>
  );
};

export default PersonalInfo;
