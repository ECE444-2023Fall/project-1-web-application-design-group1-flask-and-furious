'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FindEventsNavBar = () => {
  return (
    <div className="flex h-16 w-full flex-row justify-evenly border-b text-black">
      <Link
        href="/events/find/feed"
        className={
          'flex flex-auto items-center justify-center shadow ' +
          (usePathname() === '/events/find/feed'
            ? 'bg-slate-200'
            : 'bg-slate-50 hover:bg-slate-200')
        }
      >
        Feed
      </Link>
      <Link
        href="/events/find/map"
        className={
          'flex flex-auto items-center justify-center shadow ' +
          (usePathname() === '/events/find/map'
            ? 'bg-slate-200'
            : 'bg-slate-50 hover:bg-slate-200')
        }
      >
        Map
      </Link>
    </div>
  );
};

export default FindEventsNavBar;
