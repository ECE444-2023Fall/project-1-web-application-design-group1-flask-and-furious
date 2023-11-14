import { Tooltip } from '@nextui-org/react';
import { Session } from '@supabase/gotrue-js';
import { useRouter } from 'next/navigation';
import { SetStateAction } from 'react';
import { apiUpdateRSVPEvents } from '../app/events/api';
import { toast } from './ui/use-toast';

type Props = {
  ownerUuid: string;
  eventId: number;
  setRSVPEvents: React.Dispatch<SetStateAction<number[]>>;
  RSVPEvents: number[];
  session: Session;
};

const RSVP = ({
  ownerUuid,
  eventId,
  setRSVPEvents,
  RSVPEvents,
  session
}: Props) => {
  const router = useRouter();

  const RSVPed = RSVPEvents.includes(eventId);
  const disabled = session ? ownerUuid === session.user.id : false;

  return (
    <div className="z-50 flex flex-row items-center justify-between p-2">
      <div className="flex flex-row gap-1">
        <Tooltip
          isDisabled={!disabled}
          content="You cant RSVP to your own event"
        >
          <span>
            <button
              id="RSVP-button"
              disabled={disabled}
              className={`btn btn-primary !border-transparent text-white ${
                RSVPed
                  ? 'bg-gray-600 hover:bg-gray-600/80'
                  : 'bg-primary hover:bg-primary/80'
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
                        title: RSVPed
                          ? 'RSVP Cancellation Failed'
                          : 'RSVP Failed',
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
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default RSVP;
