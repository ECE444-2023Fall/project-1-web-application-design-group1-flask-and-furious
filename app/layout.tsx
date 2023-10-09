import Navbar from '@/components/Navbar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ClubHub',
  description: 'Your hub for finding events on the University of Toronto campus'
};

const supabase = createServerComponentClient({ cookies });

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
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
