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
      eventData: {
        id: 1,
        created_at: '2021-10-28T00:00:00.000000Z',
        Owner: '14325',
        image_url: 'https://picsum.photos/200/300',
        Title: 'Awesome Concert',
        Description:
          'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
        Location: 'Galbraith 202',
        StartTime: '8-10 pm',
        EndTime: '8-10 pm',
        Date: '29/10/2023',
        Frequency: 'Weekly',
        Tags: ['Programming', 'Music', 'Dance']
      }
    };

    render(<EventCard {...props} />);

    const heading = screen.getByRole('heading', {
      name: /Awesome Concert/i
    });

    expect(heading).toBeInTheDocument();
  });
});
