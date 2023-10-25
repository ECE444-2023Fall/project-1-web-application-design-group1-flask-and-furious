'use client';
import Drawer from '@/components/Drawer';
import EventCard from '@/components/EventCard';
import EventForm from '@/components/EventForm';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export interface EventCardProps {
  eventName: string;
  eventLocation: string;
  eventDate: string;
  eventTime: string;
  eventFrequency: string;
  eventTags: string[];
  eventDescription: string;
}

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true); // Initialize isOpen state

  const onCloseDrawer = () => {
    setIsDrawerOpen(false);
  };
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <div className="flex h-full flex-row">
      <Drawer
        isOpen={isDrawerOpen}
        style={isDrawerOpen ? '' : '-translate-x-full'}
        onClose={onCloseDrawer}
      >
        <EventForm onClose={onCloseDrawer} />
      </Drawer>
      <div
        className={`transform-transition absolute right-0 h-[calc(100vh-64px)] duration-500 ${
          isDrawerOpen ? 'w-2/3 ' : 'w-full'
        }`}
      >
        <div className="flex h-9 w-full items-center bg-slate-50 p-3">
          <h5
            className="cursor-pointer text-lg font-bold"
            onClick={toggleDrawer}
          >
            Create Event
          </h5>
          <SquaresPlusIcon
            className="ml-2 h-5 w-5 cursor-pointer fill-current stroke-1 text-black"
            aria-hidden="true"
            onClick={toggleDrawer}
          />
        </div>
        <div className="grid h-[calc(100vh-64px-36px)] grid-cols-3 gap-4 overflow-y-auto p-4">
          {/* Create some dummy events */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
            (id) => (
              <EventCard
                key={id}
                eventName={'Awesome Concert'}
                eventDescription={
                  'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
                }
                eventLocation={'Galbraith 202'}
                eventDate={'29/10/2023'}
                eventTime={'8-10 pm'}
                eventTags={['Programming', 'Music', 'Dance']}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
