import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export interface EventCardProps {
  eventName: string;
  eventDescription: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventTags: string[];
}

export default function EventCard(props: EventCardProps) {
  return (
    <div className="flex max-w-sm flex-col gap-2 rounded-lg border border-gray-200 bg-white shadow">
      {/* <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" /> */}
      <div className="flex flex-row px-3">
        <div className="flex flex-col gap-1">
          <h5 className="text-lg font-bold text-gray-900 ">
            {props.eventName}
          </h5>
          <div className="flex flex-row gap-1">
            <MapPinIcon
              className="h-5 w-5 stroke-1 text-black"
              aria-hidden="true"
            />
            <p className="text-sm font-normal text-gray-700">
              {props.eventLocation}
            </p>
          </div>
          <p className="text-sm font-normal text-gray-700">
            {props.eventDescription}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row-reverse gap-1">
            <CalendarDaysIcon
              className="h-5 w-5 stroke-1 text-black"
              aria-hidden="true"
            />
            <p className="text-sm font-normal text-gray-700">
              {props.eventDate}
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
      </div>

      <div className="flex flex-row gap-1 px-3 pb-3">
        {props.eventTags.map((tag, id) => (
          <div key={id} className="rounded-full bg-gray-100 px-2">
            <p className="text-sm font-normal text-gray-700">{tag}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
