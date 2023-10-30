import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export interface ManageEventCardProps {
  eventId: number;
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventTags: string[];
  action: (id: number) => void;
}

export default function ManageEventCard(props: ManageEventCardProps) {
  return (
    <div
      className="flex max-w-sm flex-col gap-1 rounded-lg border border-gray-200 bg-white p-3 shadow hover:bg-gray-100"
      onClick={() => props.action(props.eventId)}
    >
      {/* <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" /> */}

      <div className="flex flex-row items-center justify-between">
        <h5 className="text-lg font-bold text-gray-900 ">{props.eventName}</h5>
        <div className="flex flex-row-reverse gap-1">
          <CalendarDaysIcon
            className="h-5 w-5 stroke-1 text-black"
            aria-hidden="true"
          />
          <p className="text-sm font-normal text-gray-700">{props.eventDate}</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
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
          <p className="text-sm font-normal text-gray-700">{props.eventTime}</p>
        </div>
      </div>

      <p className="text-sm font-normal text-gray-700">
        {props.eventDescription}
      </p>

      <div className="flex flex-row gap-1">
        {props.eventTags.map((tag, id) => (
          <div key={id} className="rounded-full bg-gray-200 px-2">
            <p className="text-sm font-normal text-gray-700">{tag}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
