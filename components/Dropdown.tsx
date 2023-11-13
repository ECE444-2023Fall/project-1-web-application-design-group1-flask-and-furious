import React from 'react';

type Props = {
  tags: Record<string, boolean>;
  setSelectedTags: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
};

const Dropdown = ({ tags, setSelectedTags }: Props) => {
  return (
    <div
      className="dropdown dropdown-end dropdown-bottom max-h-[55px]"
      data-testid="tagsDropdown"
    >
      <label
        tabIndex={0}
        className="btn max-w-xs border-transparent bg-primary text-white hover:border-transparent hover:bg-violet-500 "
      >
        <span className="text-xs">Add Tags</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
        </svg>
      </label>
      <ul
        tabIndex={0}
        className="w-30 menu dropdown-content rounded-box z-[1] h-[200px] flex-col flex-nowrap overflow-hidden overflow-y-scroll bg-primary p-2 shadow scrollbar-hide"
      >
        {Object.keys(tags)?.map((tag) =>
          !tags[tag] ? (
            <li
              className="rounded-box text-white hover:text-white"
              onClick={() =>
                setSelectedTags((prev) => ({ ...prev, [tag]: !prev[tag] }))
              }
              key={tag}
            >
              <a>{tag}</a>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default Dropdown;
