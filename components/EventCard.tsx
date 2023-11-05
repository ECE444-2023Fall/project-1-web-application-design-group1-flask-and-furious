import { Json } from '@/lib/database.types';
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export type Props = {
  eventId: number;
  title: string;
  date: string;
  location: string;
  description: string;
  tags: Json[];
  length?: string;
  action?: (id: number) => void;
};

export default function EventCard({
  eventId,
  title,
  date,
  location,
  description,
  tags,
  length,
  action
}: Props) {
  return (
    <div
      className="flex max-w-sm flex-col gap-1 rounded-lg border border-gray-200 bg-white p-3 shadow hover:bg-gray-100"
      onClick={() => {
        if (typeof action === 'function') {
          action(eventId);
        }
      }}
    >
      {/* <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" /> */}

      <div className="flex flex-row items-center justify-between">
        <h5 className="text-lg font-bold text-gray-900 ">{title}</h5>
        <div className="flex flex-row-reverse gap-1">
          <CalendarDaysIcon
            className="h-5 w-5 stroke-1 text-black"
            aria-hidden="true"
          />
          <p className="text-sm font-normal text-gray-700">{date}</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row gap-1">
          <MapPinIcon
            className="h-5 w-5 stroke-1 text-black"
            aria-hidden="true"
          />
          <p className="text-sm font-normal text-gray-700">{location}</p>
        </div>
        <div className="flex flex-row-reverse gap-1">
          <ClockIcon
            className="h-5 w-5 stroke-1 text-black"
            aria-hidden="true"
          />
          <p className="text-sm font-normal text-gray-700">{length}</p>
        </div>
      </div>

      <p className="text-sm font-normal text-gray-700">{description}</p>

      <div className="flex flex-row gap-1">
        {(tags as Json[]).map((tag, id) => (
          <div key={id} className="rounded-full bg-gray-200 px-2">
            <p className="text-sm font-normal text-gray-700">{tag as string}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
