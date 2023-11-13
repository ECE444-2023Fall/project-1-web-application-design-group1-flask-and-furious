'use client';
import { Session } from '@supabase/gotrue-js';
import { usePathname } from 'next/navigation';
import NavbarProfile from './NavbarProfile';

type Props = {
  session: Session | null;
};

function NavbarOld({ session }: Props) {
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

import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { useEffect, useState } from 'react';

export default function Navigationbar({ session }: Props) {
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);
  
  const pathname = usePathname();

  useEffect(() => {
    if (!session) {
      return;
    }
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: `Bearer ${session?.access_token}`
      }
    };
    fetch('/api/profiles/picture', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        const { pictureUrl } = JSON.parse(data)['data'][0];
        setPictureUrl(pictureUrl);
      });
  }, []);

  return (
    <Navbar>
      <NavbarBrand>
        <Link href='/'>
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
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={['/events/find/feed', '/events/find/map'].includes(pathname)}>
          <Link color={['/events/find/feed', '/events/find/map'].includes(pathname) ? "secondary" : "foreground"} href="/events/find/feed">
            Find Events
          </Link>
        </NavbarItem>
        {session && <NavbarItem isActive={pathname === '/events/manage'}>
          <Link color={pathname === '/events/manage' ? "secondary" : "foreground"} href="/events/manage">
            Manage Events
          </Link>
        </NavbarItem>}
      </NavbarContent>


      {session ?
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src={pictureUrl ? pictureUrl : "http://www.gravatar.com/avatar/?d=mp"}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session.user.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
              <DropdownItem key="logout" color="danger">
                <form action="/auth/sign-out" method="post">
                  <button type='submit'>
                    Log Out
                  </button>
                </form>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      :
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
      }
    </Navbar>
  );
}
