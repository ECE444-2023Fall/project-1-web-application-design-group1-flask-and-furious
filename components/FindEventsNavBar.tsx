'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FindEventsNavBar = () => {
  return (
    <div className="flex h-16 w-full flex-row justify-evenly border-b bg-slate-50 p-6 text-black">
      <Link
        href="/events/feed"
        className={
          usePathname() === '/events/feed'
            ? 'flex flex-row items-center bg-slate-300 hover:opacity-50'
            : 'flex flex-row items-center hover:opacity-50'
        }
      >
        Feed
      </Link>
      <Link
        href="/events/map"
        className={
          usePathname() === '/events/map'
            ? 'flex flex-row items-center bg-slate-300 hover:opacity-50' //TODO: figure out how to get this background to apply to the entire box
            : 'flex flex-row items-center hover:opacity-50'
        }
      >
        Map
      </Link>
    </div>
  );
};

export default FindEventsNavBar;
