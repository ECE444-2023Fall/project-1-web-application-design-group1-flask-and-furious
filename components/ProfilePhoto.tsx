import Image from 'next/image';

type Props = {
  url: string | null;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProfilePhoto = ({ url, onFileUpload }: Props) => {
  return (
    <>
      <div className="relative h-80 w-80 overflow-clip rounded-full border-8 border-violet-600 bg-white ">
        {url ? (
          <Image src={url} fill objectFit="cover" alt="Profile Picture" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        )}
      </div>{' '}
      <label
        htmlFor="uploadedProfilePhoto"
        className="group absolute flex h-80 w-80 cursor-pointer items-center justify-center rounded-full opacity-60 transition duration-500 hover:bg-gray-200"
      >
        <Image
          className="hidden group-hover:block"
          height={48}
          width={48}
          src="https://www.svgrepo.com/show/33565/upload.svg"
          alt="Upload Icon"
        />
        <input
          type="file"
          accept="image/*"
          name="uploadedProfilePhoto"
          id="uploadedProfilePhoto"
          onChange={onFileUpload}
          className="mx-16 mt-4 hidden file:mr-4 file:rounded-full file:border-0 file:bg-violet-600 file:px-4 file:py-2 file:text-center file:font-semibold file:text-white hover:file:bg-violet-900"
        />
      </label>
    </>
  );
};

export default ProfilePhoto;
