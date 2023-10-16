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

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };
  

  return (
    <main className="relative h-screen w-full">
      <Drawer
        isOpen={isDrawerOpen}
        style={`overflow-y-auto absolute h-screen bg-slate-50 left-0 transform-transition duration-500 w-1/3 bg-slate-50 ${
          isDrawerOpen ? '' : '-translate-x-full'
        }`}
        onClose={toggleDrawer}
      >
        <EventForm onClose={toggleDrawer}/>
      </Drawer>
      <div
        className={`transform-transition absolute right-0 h-screen duration-500 ${
          isDrawerOpen ? 'w-2/3 ' : 'w-full'
        }`}
      >
        <div onClick={toggleDrawer} className="cursor-pointer flex h-9 w-full items-center bg-slate-50 p-3">
          <h5 className="text-lg font-bold">Create Event</h5>
          <SquaresPlusIcon
            className="ml-2 h-5 w-5 fill-current stroke-1 text-black"
            aria-hidden="true"
          />
        </div>
        <div className="grid grid-cols-3 gap-4 p-4">
          {/* Create some dummy events */}
          {[1, 2, 3, 4, 5, 6, 7].map((id) => (
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
          ))}
        </div>
      </div>
    </main>
  );
}
