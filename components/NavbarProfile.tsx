import { Menu, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Session } from '@supabase/gotrue-js';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

type Props = {
  session: Session | null;
};

export default function NavbarProfile({ session }: Props) {
  // Get profile picture from api/profiles/picture endpoint get request
  const [pictureUrl, setPictureUrl] = useState<string | null>(null);

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
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="relative h-12 w-12">
        {pictureUrl ? (
          <Image
            src={pictureUrl}
            fill
            objectFit="cover"
            className="overflow-clip rounded-full border-2 border-violet-600 transition hover:opacity-75"
            alt={'Profile Photo'}
          />
        ) : (
          <UserCircleIcon
            className="-mr-1 h-12 w-12 stroke-1 text-gray-400"
            aria-hidden="true"
          />
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {session && (
            <div className="flex flex-col items-center gap-4">
              <Menu.Item>
                <a
                  href="#"
                  className="block cursor-default px-4 py-2 text-sm text-gray-700"
                >
                  {session.user.email}
                </a>
              </Menu.Item>
            </div>
          )}
          <div className="py-1">
            {session && (
              <div className="flex flex-col items-center gap-4">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href="/profile"
                      className={
                        (active
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700') +
                        ' block w-full px-4 py-2 text-left text-sm'
                      }
                    >
                      Profile
                    </Link>
                  )}
                </Menu.Item>
              </div>
            )}
            {session ? (
              <form action="/auth/sign-out" method="post">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="submit"
                      className={
                        (active
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700') +
                        ' block w-full px-4 py-2 text-left text-sm'
                      }
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </form>
            ) : (
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/login"
                    className={
                      (active ? 'bg-gray-100 text-gray-900' : 'text-gray-700') +
                      ' block w-full px-4 py-2 text-left text-sm'
                    }
                  >
                    Sign In
                  </Link>
                )}
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
