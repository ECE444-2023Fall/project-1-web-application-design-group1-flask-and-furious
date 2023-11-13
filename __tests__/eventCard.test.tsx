import EventCard, { EventCardProps } from '@/components/EventCard';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: () => ({
    auth: {
      getSession: jest.fn(async () => ({
        data: {
          session: {
            user: {
              id: 'user-123',
              email: 'user@example.com'
            },
            accessToken: 'mock_access_token'
          }
        },
        error: null
      }))
    },
    from: () => ({
      select: jest.fn(async () => ({
        data: [
          { id: 1, tag: 'tag1' },
          { id: 2, tag: 'tag2' }
        ],
        error: null
      }))
    })
  })
}));

describe('EventCard', () => {
  it('Renders Event Name', async () => {
    const props: EventCardProps = {
      eventName: 'Awesome Concert',
      eventDescription:
        'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      eventLocation: 'Galbraith 202',
      eventDate: '29/10/2023',
      eventTime: '8-10 pm',
      eventTags: ['Programming', 'Music', 'Dance'],
      eventId: 0,
      eventImage: ''
    };

    render(<EventCard {...props} />);

    const heading = screen.getByRole('heading', {
      name: /Awesome Concert/i
    });

    expect(heading).toBeInTheDocument();
  });
});
