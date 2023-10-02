import Navbar from '@/components/Navbar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session }
  } = await supabase.auth.getSession();
  return (
    <main className="w-full flex flex-col items-center">
      <Navbar session={session} />
      <div>Hello World</div>
    </main>
  );
}