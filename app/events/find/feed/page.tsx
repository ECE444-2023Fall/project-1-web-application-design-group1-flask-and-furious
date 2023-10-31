'use client';
import EventCard from '@/components/EventCard';

export default function page() {
  return (
    <div className="flex h-[calc(100vh-64px-64px)] w-full flex-col items-center overflow-y-auto">
      <div className="grid grid-cols-3 gap-4 p-4">
        {/* Create some dummy events */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
          (id) => (
            <EventCard
              key={id}
              eventId={id}
              eventName={'Awesome Concert'}
              eventDescription={
                'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
              }
              eventLocation={'Galbraith 202'}
              eventDate={'29/10/2023'}
              eventTime={'8-10 pm'}
              eventTags={['Programming', 'Music', 'Dance']}
            />
          )
        )}
      </div>
    </div>
  );
}
