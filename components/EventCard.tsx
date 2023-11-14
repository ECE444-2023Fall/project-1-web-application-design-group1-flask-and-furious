import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { Chip } from '@nextui-org/react';
import { Session } from '@supabase/gotrue-js';
import { SetStateAction } from 'react';
import RSVP from './RSVP';

export interface EventCardProps {
  eventId: number;
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventTags: string[];
  eventImage: string;
  action?: (id: number) => void;
  viewer?: boolean;
  rsvpCount?: number;
  setRSVPEvents?: React.Dispatch<React.SetStateAction<number[]>>;
  RSVPEvents?: number[];
  session?: Session;
}

export default function EventCard(props: EventCardProps) {
  const defaultImage =
    'https://yqrgbzoauzaaznsztnwb.supabase.co/storage/v1/object/public/Images/no-image';
  return (
    <div className="max-h-sm flex max-w-sm flex-col gap-1 rounded-lg border border-gray-200 bg-white shadow-md hover:bg-gray-100">
      <div
        onClick={() => {
          if (typeof props.action === 'function') {
            props.action(props.eventId);
          }
        }}
      >
        <div className="relative">
          <img
            className="aspect-video h-48 w-full rounded-t-lg object-cover"
            src={props.eventImage || defaultImage}
            alt={props.eventName}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultImage;
            }}
          />
          <div className="absolute right-2 top-2 rounded-full border border-black bg-primary p-2 text-white shadow">
            RSVPs: {props.rsvpCount || 0}
          </div>
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
            {props.eventName}
          </h5>
          <div className="flex flex-row-reverse gap-1">
            <CalendarDaysIcon
              className="h-5 w-5 stroke-1 text-black"
              aria-hidden="true"
            />
            <p className="text-sm font-normal text-gray-700">
              {props.eventDate}
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
              {props.eventLocation}
            </p>
          </div>
          <div className="flex flex-row-reverse gap-1">
            <ClockIcon
              className="h-5 w-5 stroke-1 text-black"
              aria-hidden="true"
            />
            <p className="text-sm font-normal text-gray-700">
              {props.eventTime}
            </p>
          </div>
        </div>

        <p className="p-2 text-sm font-normal text-gray-700">
          {props.eventDescription.substring(0, 160) +
            (props.eventDescription.length > 160 ? '...' : '')}
        </p>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row flex-wrap gap-1 p-2">
          {props.eventTags.slice(0, 3).map((tag, id) => (
            <div key={id} className="rounded-full bg-gray-200 px-2">
              <p className="text-sm font-normal text-gray-700">{tag}</p>
            </div>
          ))}
          {props.eventTags.length > 3 && (
            <div className="rounded-full bg-gray-200 px-2">
              <p className="text-sm font-normal text-gray-700">
                {props.eventTags.length} More...
              </p>
            </div>
          )}
        </div>
        {props.viewer && (
          <RSVP
            eventId={props.eventId}
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
