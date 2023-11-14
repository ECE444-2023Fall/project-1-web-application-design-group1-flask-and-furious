import { formatTime } from '@/app/events/helpers';
import { EventData } from '@/app/events/types';
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import {
  Button,
  Chip,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter
} from '@nextui-org/react';
import { Session } from '@supabase/gotrue-js';
import { SetStateAction, useState } from 'react';
import RSVP from './RSVP';

export interface EventModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  event: EventData;
  RSVPEvents: number[];
  setRSVPEvents?: React.Dispatch<React.SetStateAction<number[]>>;
  session?: Session;
  rsvpCount?: number;
}

export default function EventModal(props: EventModalProps) {
  const isOpen = props.isOpen;
  const onOpenChange = props.onOpenChange;
  const event = props.event;

  const defaultImage =
    'https://yqrgbzoauzaaznsztnwb.supabase.co/storage/v1/object/public/Images/no-image';
  const [imgError, setImgError] = useState<boolean>(false);

  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <div className="relative">
              <Image
                width={450}
                height={200}
                alt="event image"
                src={imgError ? defaultImage : event.image_url}
                className="z-0"
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
                <span className="font-semibold">
                  RSVPs: {props.rsvpCount || 0}
                </span>
              </Chip>
            </div>
            <ModalBody>
              <div className="flex flex-row items-center justify-between">
                <h5 className="text-lg font-bold text-gray-900 ">
                  {event.Title}
                </h5>
                <div className="flex flex-row-reverse gap-1">
                  <CalendarDaysIcon
                    className="h-5 w-5 stroke-1 text-black"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-normal text-gray-700">
                    {event.Date}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-1">
                  <MapPinIcon
                    className="h-5 w-5 stroke-1 text-black"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-normal text-gray-700">
                    {event.Location}
                  </p>
                </div>
                <div className="flex flex-row-reverse gap-1">
                  <ClockIcon
                    className="h-5 w-5 stroke-1 text-black"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-normal text-gray-700">
                    {`${formatTime(event.StartTime)} - ${formatTime(
                      event.EndTime
                    )}`}
                  </p>
                </div>
              </div>

              <p className="p-2 text-sm font-normal text-gray-700">
                {event.Description}
              </p>

              <div className="flex flex-row flex-wrap gap-1 p-2">
                {event.Tags.map((tag, id) => (
                  <div key={id} className="rounded-full bg-gray-200 px-2">
                    <p className="text-sm font-normal text-gray-700">{tag}</p>
                  </div>
                ))}
              </div>
            </ModalBody>
            <ModalFooter className="items-center justify-between">
              <Button size="lg" color="danger" onPress={onClose}>
                Close
              </Button>
              <RSVP
                ownerUuid={event.Owner}
                eventId={event.id}
                setRSVPEvents={
                  props.setRSVPEvents as React.Dispatch<
                    SetStateAction<number[]>
                  >
                }
                RSVPEvents={props.RSVPEvents as number[]}
                session={props.session as Session}
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
