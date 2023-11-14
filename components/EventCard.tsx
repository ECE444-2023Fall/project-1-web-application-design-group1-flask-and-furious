import { formatTime } from '@/app/events/helpers';
import { EventData } from '@/app/events/types';
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { Chip, Image } from '@nextui-org/react';
import { Session } from '@supabase/gotrue-js';
import { SetStateAction, useState } from 'react';
import RSVP from './RSVP';

export interface EventCardProps {
  eventData: EventData;
  action?: (id: number) => void;
  viewer?: boolean;
  rsvpCount?: number;
  setRSVPEvents?: React.Dispatch<React.SetStateAction<number[]>>;
  RSVPEvents?: number[];
  session?: Session;
}

const defaultImage =
  'https://yqrgbzoauzaaznsztnwb.supabase.co/storage/v1/object/public/Images/no-image';

export default function EventCard(props: EventCardProps) {
  const [imgError, setImgError] = useState<boolean>(false);
  return (
    <div className="max-h-sm flex max-w-sm flex-col gap-1 rounded-lg border border-gray-200 bg-white shadow-md hover:bg-gray-100">
      <div
        onClick={() => {
          if (typeof props.action === 'function') {
            props.action(props.eventData.id);
          }
        }}
      >
        <div className="relative">
          <Image
            className="aspect-video h-48 w-full rounded-t-lg object-cover"
            height={192}
            width={384}
            src={imgError ? defaultImage : props.eventData?.image_url}
            alt={props.eventData?.Title}
            onError={() => {
              setImgError(true);
            }}
          />
          <Chip
            className="absolute right-2 top-2"
            color="primary"
            variant="faded"
            size="lg"
          >
            <span className="font-semibold">RSVPs: {props.rsvpCount || 0}</span>
          </Chip>
        </div>

        <div className="flex flex-row items-center justify-between p-2">
          <h5 className="text-lg font-bold text-gray-900 ">
            {props.eventData.Title}
          </h5>
          <div className="flex flex-row-reverse gap-1">
            <CalendarDaysIcon
              className="h-5 w-5 stroke-1 text-black"
              aria-hidden="true"
            />
            <p className="text-sm font-normal text-gray-700">
              {props.eventData.Date}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between p-2">
          <div className="flex flex-row gap-1">
            <MapPinIcon
              className="h-5 w-5 stroke-1 text-black"
              aria-hidden="true"
            />
            <p className="text-sm font-normal text-gray-700">
              {props.eventData.Location}
            </p>
          </div>
          <div className="flex flex-row-reverse gap-1">
            <ClockIcon
              className="h-5 w-5 stroke-1 text-black"
              aria-hidden="true"
            />
            <p className="text-sm font-normal text-gray-700">{`${formatTime(
              props.eventData.StartTime
            )} - ${formatTime(props.eventData.EndTime)}`}</p>
          </div>
        </div>

        <p className="p-2 text-sm font-normal text-gray-700">
          {props.eventData.Description}
        </p>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row flex-wrap gap-1 p-2">
          {props.eventData.Tags.slice(0, 3).map((tag, id) => (
            <div key={id} className="rounded-full bg-gray-200 px-2">
              <p className="text-sm font-normal text-gray-700">{tag}</p>
            </div>
          ))}
          {props.eventData.Tags.length > 3 && (
            <div className="rounded-full bg-gray-200 px-2">
              <p className="text-sm font-normal text-gray-700">
                {props.eventData.Tags.length - 3} More...
              </p>
            </div>
          )}
        </div>
        {props.viewer && (
          <RSVP
            ownerUuid={props.eventData.Owner}
            eventId={props.eventData.id}
            setRSVPEvents={
              props.setRSVPEvents as React.Dispatch<SetStateAction<number[]>>
            }
            RSVPEvents={props.RSVPEvents as number[]}
            session={props.session as Session}
          />
        )}
      </div>
    </div>
  );
}
