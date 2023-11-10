import { Session } from '@supabase/gotrue-js';
import { useRouter } from 'next/navigation';
import { SetStateAction } from 'react';
import { apiUpdateRSVPEvents } from '../app/events/api';

type Props = {
  eventId: number;
  setRSVPEvents: React.Dispatch<SetStateAction<number[]>>;
  RSVPEvents: number[];
  session: Session;
};

const RSVP = ({ eventId, setRSVPEvents, RSVPEvents, session }: Props) => {
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
            if (session) {
              setRSVPEvents((prevEvents) =>
                RSVPed
                  ? RSVPEvents.filter((id) => id !== eventId)
                  : [...prevEvents, eventId]
              );
              apiUpdateRSVPEvents(session, {
                userUuid: session?.user.id,
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
