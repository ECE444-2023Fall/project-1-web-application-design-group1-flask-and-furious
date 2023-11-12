'use client';

import { SetStateAction } from 'react';
import Chips from './Chips';
import Dropdown from './Dropdown';

type Props = {
  selectedTags: Record<string, boolean>;
  setSelectedTags: React.Dispatch<SetStateAction<Record<string, boolean>>>;
};

const Tags = ({ selectedTags, setSelectedTags }: Props) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-2xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 6h.008v.008H6V6z"
            />
          </svg>
          Tags
        </h2>
        <Dropdown tags={selectedTags} setSelectedTags={setSelectedTags} />
      </div>
      <Chips tags={selectedTags} setSelectedTags={setSelectedTags} />
    </div>
  );
};

export default Tags;
