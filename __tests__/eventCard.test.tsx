import EventCard, { Props } from '@/components/EventCard';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('EventCard', () => {
  it('Renders Event Name', async () => {
    const props: Props = {
      eventId: 1,
      title: 'Awesome Concert',
      description:
        'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
      location: 'Galbraith 202',
      date: '29/10/2023',
      length: '8-10 pm',
      tags: ['Programming', 'Music', 'Dance']
    };

    render(<EventCard {...props} />);

    const heading = screen.getByRole('heading', {
      name: /Awesome Concert/i
    });

    expect(heading).toBeInTheDocument();
  });
});
