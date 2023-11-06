import { ProfileData } from '@/app/profile/types';

type ProfileDisplayProps = {
  age: ProfileData['age'];
  gender: ProfileData['gender'];
  city: ProfileData['city'];
  university: ProfileData['university'];
  program: ProfileData['program'];
};

export default function ProfileDisplay(props: ProfileDisplayProps) {
  const { age, gender, city, university, program } = props;
  return (
    <div className="ml-2 mt-3 flex flex-grow basis-2/4">
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="text-2xl font-semibold">Age</p>
        <p className="mt-1 text-lg">{age}</p>
      </div>
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="text-2xl font-semibold">Gender</p>
        <p className="mt-1 text-lg">{gender}</p>
      </div>
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="text-2xl font-semibold">City</p>
        <p className="mt-1 text-lg">{city}</p>
      </div>
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="text-2xl font-semibold">University</p>
        <p className="mt-1 text-lg">{university}</p>
      </div>
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="text-2xl font-semibold">Program</p>
        <p className="mt-1 text-lg">{program}</p>
      </div>
    </div>
  );
}
