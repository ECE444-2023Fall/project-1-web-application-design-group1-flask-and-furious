import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { SetStateAction, useState } from 'react';
import { apiUpdateRSVPEvents } from '../app/events/api';

type Props = {
  eventId: number;
  setRSVPEvents: React.Dispatch<SetStateAction<number[]>>;
  RSVPEvents: number[];
};

const RSVP = ({ eventId, setRSVPEvents, RSVPEvents }: Props) => {
  const supabase = createClientComponentClient();
  const session = supabase.auth.getSession();

  const [hovered, setHovered] = useState(false);

  const RSVPed = RSVPEvents.includes(eventId);

  return (
    <div className="flex flex-row items-center justify-between p-2">
      <div className="flex flex-row gap-1">
        <button
          id="RSVP-button"
          className={`btn btn-primary !border-transparent text-white ${
            RSVPed
              ? 'bg-green-600 hover:bg-red-600'
              : 'bg-violet-500 hover:bg-green-600'
          }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={async () => {
            setRSVPEvents((prevEvents) =>
              RSVPed
                ? RSVPEvents.filter((id) => id !== eventId)
                : [...prevEvents, eventId]
            );
            apiUpdateRSVPEvents((await session).data.session, {
              userUuid: (await session).data.session?.user.id,
              eventId: String(eventId)
            });
          }}
        >
          {RSVPed ? (
            hovered ? (
              <h1>Stop Atteneding?</h1>
            ) : (
              <h1>RSVP&#39;d</h1>
            )
          ) : (
            <h1>RSVP?</h1>
          )}
        </button>
      </div>
    </div>
  );
};

export default RSVP;
