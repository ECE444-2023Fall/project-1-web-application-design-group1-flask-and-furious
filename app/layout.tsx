import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ClubHub',
  description: 'Your hub for finding events on the University of Toronto campus'
};

//1. Auth on frontend
//2. In backend just verify the token before doing anything

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center bg-purple-100">
          {children}
        </main>
      </body>
    </html>
  );
}
