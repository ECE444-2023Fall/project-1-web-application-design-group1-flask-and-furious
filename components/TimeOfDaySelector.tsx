import React from 'react';
import { TimeOfDay } from './MapBox';

type Props = {
  selectedTime: string;
  setSelectedTime: React.Dispatch<React.SetStateAction<TimeOfDay>>;
};

const TimeOfDaySelector = ({ selectedTime, setSelectedTime }: Props) => {
  return (
    <div
      className="m-4 w-full max-w-xs"
      style={{
        position: 'absolute', // Use absolute positioning to place the scale on top of the map
        left: 0 // Align to the left of the container
      }}
    >
      <div className="relative">
        <div className="flex items-center justify-between rounded-lg bg-gray-100 px-4 py-2">
          <button
            className={`${
              selectedTime === 'dawn' && 'bg-gray-300 transition-all'
            } flex flex-col items-center rounded-lg p-1 text-white focus:outline-none`}
            onClick={() => setSelectedTime('dawn')}
          >
            <svg
              className=" h-6 w-6 text-yellow-500"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2v8" />
              <path d="m4.93 10.93 1.41 1.41" />
              <path d="M2 18h2" />
              <path d="M20 18h2" />
              <path d="m19.07 10.93-1.41 1.41" />
              <path d="M22 22H2" />
              <path d="m8 6 4-4 4 4" />
              <path d="M16 18a4 4 0 0 0-8 0" />
            </svg>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Dawn
            </span>
          </button>
          <button
            className={`${
              selectedTime === 'day' && 'bg-gray-300'
            } flex flex-col items-center rounded-lg p-1 transition-all focus:outline-none`}
            onClick={() => setSelectedTime('day')}
          >
            <svg
              className=" h-6 w-6 text-yellow-600"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Day
            </span>
          </button>
          <button
            className={`${
              selectedTime === 'dusk' && 'bg-gray-300 transition-all'
            } flex flex-col items-center rounded-lg p-1 focus:outline-none`}
            onClick={() => setSelectedTime('dusk')}
          >
            <svg
              className=" h-6 w-6 text-orange-500"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 10V2" />
              <path d="m4.93 10.93 1.41 1.41" />
              <path d="M2 18h2" />
              <path d="M20 18h2" />
              <path d="m19.07 10.93-1.41 1.41" />
              <path d="M22 22H2" />
              <path d="m16 6-4 4-4-4" />
              <path d="M16 18a4 4 0 0 0-8 0" />
            </svg>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Dusk
            </span>
          </button>
          <button
            className={`${
              selectedTime === 'night' && 'bg-gray-300 transition-all'
            } flex flex-col items-center rounded-lg p-1 focus:outline-none`}
            onClick={() => setSelectedTime('night')}
          >
            <svg
              className=" h-6 w-6 text-stone-700"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Night
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeOfDaySelector;
