'use client';
import React, { useState } from 'react';

type Props = {
  search: string;
};

const SearchBar: React.FC<Props> = ({ search }: Props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const isMatch = search.toLowerCase().includes(searchQuery.toLowerCase());

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div
      className="search-container"
      style={{ width: '400px', border: '3px solid purple' }}
    >
      <input
        type="text"
        id="search-input"
        placeholder="Find an event by name..."
        value={searchQuery}
        onChange={handleSearchInput}
        style={{
          width: '100%',
          height: '40px',
          fontSize: '16px',
          color: 'purple',
          fontWeight: 'bold',
          padding: '0 10px'
        }}
      />
      <ul id="search-results">
        {isMatch ? <li>{search}</li> : <li>No results found.</li>}
      </ul>
    </div>
  );
};

export default SearchBar;
