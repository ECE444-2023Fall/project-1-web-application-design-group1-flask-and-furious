'use client';
import { FilteredEventData } from '@/app/events/find/feed/page';
import React from 'react';

type Props = {
  setEvents: React.Dispatch<React.SetStateAction<FilteredEventData[]>>;
  events: FilteredEventData[];
};

const SearchBar: React.FC<Props> = ({ events, setEvents }: Props) => {
  // const [searchQuery, setSearchQuery] = useState('');
  // const [displayedEvents, setDisplayedEvents] = useState<EventData[]>([]);

  const handleSearchInput = (
    inputEvent: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchValue = inputEvent.target.value;

    if (searchValue === '') {
      //Set all events hidden value to false so theyre all displayed
      setEvents(
        events.map((event) => ({
          ...event,
          hidden: false
        }))
      );
    } else {
      // Find all events that contain the search term in their title and set their hidden value to false and all others to true
      setEvents(
        events.map((event) => ({
          ...event,
          hidden: !event.Title.toLowerCase().includes(searchValue.toLowerCase())
        }))
      );
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        id="search-input"
        placeholder="Find an event by name..."
        // value={searchQuery}
        onChange={handleSearchInput}
        className="m-1 h-10 w-full rounded-md border-2 border-solid border-primary p-2 font-bold"
        // style={{
        //   width: '100%',
        //   height: '40px',
        //   fontSize: '16px',
        //   color: 'purple',
        //   fontWeight: 'bold',
        //   padding: '0 10px'
        // }}
      />
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
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </div>
  );
};

export default SearchBar;
