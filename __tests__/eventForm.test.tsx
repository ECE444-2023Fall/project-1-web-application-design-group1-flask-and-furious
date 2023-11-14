import EventForm, { formProps } from '@/components/EventForm';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

// Mock the createClientComponentClient from '@supabase/auth-helpers-nextjs'
jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: () => ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    from: (_tableName: string) => ({
      select: async () => ({
        data: [
          { id: 1, tag: 'tag1' },
          { id: 2, tag: 'tag2' }
        ],
        error: null
      })
    })
  })
}));

jest.mock('@mapbox/search-js-react', () => ({
  SearchBox: jest.fn(() => null)
}));

// Rest of your test code

describe('EventForm', () => {
  const mockOnClose = jest.fn();
  const mockPost = jest.fn();
  const mockUpdate = jest.fn();
  const props: formProps = {
    onClose: mockOnClose,
    Post: mockPost,
    initialFormData: {
      eventId: 1,
      title: 'Awesome Cool Concert',
      description: 'Super awesome concert that everyone want to go to!',
      location: 'Perfect Location',
      startTime: '21:00:00',
      endTime: '23:00:00',
      date: '2023-10-28',
      frequency: 'Weekly',
      tags: ['Tag 1', 'Tag 3'],
      file: null,
      latitude: undefined,
      longitude: undefined
    },
    Update: mockUpdate,
    isNewEvent: false,
    Delete: function (): void {
      throw new Error('Function not implemented.');
    },
    onFileSelect: function (): void {
      throw new Error('Function not implemented.');
    },
    backgroundImage: null
  };

  it('Render form with the appropriate initialFormData', async () => {
    render(<EventForm {...props} />);

    await waitFor(() => {
      expect(
        screen.getByDisplayValue('Awesome Cool Concert')
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(
          'Super awesome concert that everyone want to go to!'
        )
      ).toBeInTheDocument();
      expect(screen.getByDisplayValue('21:00:00')).toBeInTheDocument();
      expect(screen.getByDisplayValue('23:00:00')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2023-10-28')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Weekly')).toBeInTheDocument();
    });
  });
});
