import { Session } from '@supabase/gotrue-js';
import { useRouter } from 'next/navigation';
import { SetStateAction } from 'react';
import { apiUpdateRSVPEvents } from '../app/events/api';
import { toast } from './ui/use-toast';

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
              apiUpdateRSVPEvents(session, {
                userUuid: session?.user.id,
                eventId: String(eventId)
              }).then((response) => {
                if (response.ok) {
                  setRSVPEvents((prevEvents) =>
                    RSVPed
                      ? RSVPEvents.filter((id) => id !== eventId)
                      : [...prevEvents, eventId]
                  );
                  toast({
                    title: RSVPed ? 'RSVP Cancelled' : "Successfully RSVP'd"
                  });
                } else {
                  toast({
                    variant: 'destructive',
                    title: RSVPed ? 'RSVP Cancellation Failed' : 'RSVP Failed',
                    description: 'Something went wrong. Please try again.'
                  });
                }
              });
            } else {
              router.push('/login');
            }
          }}
        >
          {RSVPed ? (
            <h1>
              Cancel <br /> RSVP
            </h1>
          ) : (
            <h1>RSVP</h1>
          )}
        </button>
      </div>
    </div>
  );
};

export default RSVP;
