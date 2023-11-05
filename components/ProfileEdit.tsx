type ProfileEditProps = {
  age: number;
  setAge: (age: number) => void;
  gender: string;
  setGender: (gender: string) => void;
  city: string;
  setCity: (city: string) => void;
  university: string;
  setUniversity: (university: string) => void;
  program: string;
  setProgram: (program: string) => void;
};

export default function ProfileEdit(props: ProfileEditProps) {
  const {
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
  } = props;

  const ageOptions = [0, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 29, 30];
  const genderOptions = ['', 'Male', 'Female', 'Non-Binary', 'Other'];
  const cityOptions = ['', 'Toronto', 'Mississauga', 'Scarborough'];
  const universityOptions = [
    '',
    'University of Toronto',
    'Toronto Metropolitan University',
    'York University'
  ];
  const programOptions = [
    '',
    'Computer Science',
    'Engineering',
    'Life Sciences'
  ];

  return (
    <div className="flex flex-grow basis-2/4">
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="ml-3 mt-1 text-2xl font-semibold">Age</p>
        <select
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="ml-4 mt-1 rounded-md border-2 border-gray-300 p-1 text-lg"
        >
          {ageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="ml-3 mt-1 text-2xl font-semibold">Gender</p>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="ml-4 mt-1 rounded-md border-2 border-gray-300 p-1 text-lg"
        >
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="ml-3 mt-1 text-2xl font-semibold">City</p>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="ml-4 mt-1 rounded-md border-2 border-gray-300 p-1 text-lg"
        >
          {cityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="ml-3 mt-1 text-2xl font-semibold">University</p>
        <select
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          className="ml-4 mt-1 rounded-md border-2 border-gray-300 p-1 text-lg"
        >
          {universityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="ml-3 mt-1 text-2xl font-semibold">Program</p>
        <select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="ml-4 mt-1 rounded-md border-2 border-gray-300 p-1 text-lg"
        >
          {programOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
