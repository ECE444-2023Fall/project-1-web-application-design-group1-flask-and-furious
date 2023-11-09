import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { SetStateAction } from 'react';
import { apiUpdateRSVPEvents } from '../app/events/api';

type Props = {
  eventId: number;
  setRSVPEvents: React.Dispatch<SetStateAction<number[]>>;
  RSVPEvents: number[];
};

const RSVP = ({ eventId, setRSVPEvents, RSVPEvents }: Props) => {
  const supabase = createClientComponentClient();
  const session = supabase.auth.getSession();

  const router = useRouter();

  const RSVPed = RSVPEvents.includes(eventId);

  return (
    <div className="flex flex-row items-center justify-between p-2">
      <div className="flex flex-row gap-1">
        <button
          id="RSVP-button"
          className={`btn btn-primary !border-transparent text-white ${
            RSVPed
              ? 'bg-gray-600 hover:bg-gray-500'
              : 'bg-violet-500 hover:bg-violet-400'
          }`}
          onClick={async () => {
            if ((await session).data.session) {
              setRSVPEvents((prevEvents) =>
                RSVPed
                  ? RSVPEvents.filter((id) => id !== eventId)
                  : [...prevEvents, eventId]
              );
              apiUpdateRSVPEvents((await session).data.session, {
                userUuid: (await session).data.session?.user.id,
                eventId: String(eventId)
              });
            } else {
              router.push('/login');
            }
          }}
        >
          {RSVPed ? <h1>Cancel RSVP</h1> : <h1>RSVP</h1>}
        </button>
      </div>
    </div>
  );
};

export default RSVP;
