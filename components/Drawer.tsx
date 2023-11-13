'use client';

import React from 'react';

export interface DrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function Drawer({ isOpen, setIsOpen, children }: DrawerProps) {
  return (
    <div
      className={`absolute left-0 flex h-full w-1/3 bg-slate-50 duration-500 ${
        isOpen ? '' : '-translate-x-[calc(100%-32px)]'
      }`}
    >
      <div className="flex-grow">{children}</div>
      <button
        className="h-[calc(100vh-64px-64px)] w-8 hover:bg-gray-100"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? (
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
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
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
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
