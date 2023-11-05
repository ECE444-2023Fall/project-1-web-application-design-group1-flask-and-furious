type ProfileDisplayProps = {
  age?: number;
  gender: string;
  city: string;
  university: string;
  program: string;
};

export default function ProfileDisplay(props: ProfileDisplayProps) {
  const { age, gender, city, university, program } = props;
  return (
    <div className="flex flex-grow basis-2/4">
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="ml-3 mt-1 text-2xl font-semibold">Age</p>
        <p className="ml-4 mt-1 text-lg">{age}</p>
      </div>
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="ml-3 mt-1 text-2xl font-semibold">Gender</p>
        <p className="ml-4 mt-1 text-lg">{gender}</p>
      </div>
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="ml-3 mt-1 text-2xl font-semibold">City</p>
        <p className="ml-4 mt-1 text-lg">{city}</p>
      </div>
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="ml-3 mt-1 text-2xl font-semibold">University</p>
        <p className="ml-4 mt-1 text-lg">{university}</p>
      </div>
      <div className="m-2 flex flex-grow flex-col rounded bg-white">
        <p className="ml-3 mt-1 text-2xl font-semibold">Program</p>
        <p className="ml-4 mt-1 text-lg">{program}</p>
      </div>
    </div>
  );
}
