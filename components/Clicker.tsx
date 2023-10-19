'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Clicker = () => {
  const supabase = createClientComponentClient();
  const session = supabase.auth.getSession();

  const callBackend = async () => {
    // eslint-disable-next-line no-console
    console.log(session);
    fetch('/api/event', {
      headers: {
        Authentication: `Bearer ${(await session).data.session?.access_token}`
      }
    })
      .then((res) => res.json())
      // eslint-disable-next-line no-console
      .then((data) => console.log(data));
  };
  return <button onClick={callBackend}>Clicker</button>;
};

export default Clicker;
