import Navbar from '@/components/Navbar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { cache } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ClubHub',
  description: 'Your hub for finding events on the University of Toronto campus'
};

export const createServerClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({
    cookies: () => cookieStore
  });
});

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar session={session} />
        <main className="flex min-h-screen flex-col items-center bg-purple-100">
          {children}
        </main>
      </body>
    </html>
  );
}
