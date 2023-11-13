import { formatTime } from '@/app/events/helpers';
import { EventData } from '@/app/events/types';
import {
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter
} from '@nextui-org/react';

export interface EventModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  event: EventData;
}

export default function EventModal(props: EventModalProps) {
  const isOpen = props.isOpen;
  const onOpenChange = props.onOpenChange;
  const event = props.event;

  return (
    <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <Image
              width={450}
              height={200}
              className="rounded-t-lg"
              src={event.image_url}
              fallbackSrc="https://yqrgbzoauzaaznsztnwb.supabase.co/storage/v1/object/public/Images/no-image"
            />
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
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
