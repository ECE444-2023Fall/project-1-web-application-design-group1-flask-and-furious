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
        <div className="flex h-full flex-col items-center justify-center bg-violet-50">
          <div className="group relative">
            <div className="absolute -inset-0.5 animate-tilt rounded-lg bg-violet-600 bg-gradient-to-r from-pink-600 to-violet-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
            <div className="relative rounded-lg bg-violet-100 px-2 py-1">
              <h1 className="scroll-m-20 text-lg font-extrabold tracking-tighter">
                Club
                <span className="animate-text bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text px-1 text-transparent">
                  Hub
                </span>
              </h1>
            </div>
          </div>
        </div>
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
