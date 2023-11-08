'use client';
import { Session } from '@supabase/gotrue-js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavbarProfile from './NavbarProfile';

type Props = {
  session: Session | null;
};

function Navbar({ session }: Props) {
  const pathname = usePathname();
  return (
    <nav className="flex h-16 w-full flex-row justify-between border-b bg-white p-6 text-black">
      <Link href="/" className="flex flex-row items-center">
        ClubHub
      </Link>

      <div className="flex items-center gap-4">
        <Link
          href="/events/find/feed"
          className={
            ['/events/find/feed', '/events/find/map'].includes(pathname)
              ? 'font-bold underline-offset-auto'
              : 'hover:opacity-50'
          }
        >
          Find Events
        </Link>
        {session && (
          <Link
            href="/events/manage"
            className={
              pathname === '/events/manage'
                ? 'font-bold underline-offset-auto'
                : 'hover:opacity-50'
            }
          >
            Manage Events
          </Link>
        )}
        {session ? (
          <NavbarProfile session={session} />
        ) : (
          <div className="m-2 flex items-center justify-center">
            <Link
              href="/login"
              className={
                'rounded-l-xl border bg-violet-600 px-4 py-1 text-white transition hover:bg-violet-500 ' +
                (pathname === '/login' ? 'bg-violet-500' : '')
              }
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className={
                'rounded-r-xl border bg-neutral-50 px-4 py-1 transition hover:bg-neutral-200 ' +
                (pathname === '/register' ? 'bg-neutral-200' : '')
              }
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
