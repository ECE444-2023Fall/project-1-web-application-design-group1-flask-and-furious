'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FindEventsNavBar = () => {
  return (
    <div className="flex h-16 w-full flex-row justify-evenly border-b text-black">
      <Link
        href="/events/feed"
        className={
          'flex flex-auto items-center justify-center shadow ' +
          (usePathname() === '/events/feed'
            ? 'bg-slate-200'
            : 'bg-slate-50 hover:opacity-50')
        }
      >
        Feed
      </Link>
      <Link
        href="/events/map"
        className={
          'flex flex-auto items-center justify-center shadow ' +
          (usePathname() === '/events/map'
            ? 'bg-slate-200'
            : 'bg-slate-50 hover:opacity-50')
        }
      >
        Map
      </Link>
    </div>
  );
};

export default FindEventsNavBar;
