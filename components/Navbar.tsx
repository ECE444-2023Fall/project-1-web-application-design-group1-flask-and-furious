'use client';
import { Session } from '@supabase/gotrue-js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavbarProfile from './NavbarProfile';

type Props = {
  session: Session | null;
};

function Navbar({ session }: Props) {
  return (
    <nav className="flex h-16 w-full flex-row justify-between border-b bg-white p-6 text-black">
      <Link href="/" className="flex flex-row items-center">
        ClubHub
      </Link>

      <div className="flex items-center gap-2">
        <Link
          href="/events/feed"
          className={
            usePathname() === '/events'
              ? 'font-bold underline-offset-auto'
              : 'hover:opacity-50'
          }
        >
          Find Events
        </Link>
        <Link
          href="/events/manage"
          className={
            usePathname() === '/events/manage'
              ? 'font-bold underline-offset-auto'
              : 'hover:opacity-50'
          }
        >
          Manage Events
        </Link>
        <NavbarProfile session={session} />
      </div>
    </nav>
  );
}

export default Navbar;
