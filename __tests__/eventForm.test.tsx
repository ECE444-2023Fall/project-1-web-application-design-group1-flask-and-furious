import EventForm, { formProps } from '@/components/EventForm';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';

jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: () => ({
    from: () => ({
      select: () =>
        Promise.resolve({ data: [{ tag: 'Tag1' }, { tag: 'Tag2' }] })
    })
  })
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
      tags: ['Tag 1', 'Tag 3']
    },
    Update: mockUpdate,
    isNewEvent: false,
    Delete: function (): void {
      throw new Error('Function not implemented.');
    }
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
      expect(screen.getByDisplayValue('Perfect Location')).toBeInTheDocument();
      expect(screen.getByDisplayValue('21:00:00')).toBeInTheDocument();
      expect(screen.getByDisplayValue('23:00:00')).toBeInTheDocument();
      expect(screen.getByDisplayValue('2023-10-28')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Weekly')).toBeInTheDocument();

      // Check the selected tags:
      const tagsSelect = screen.getByLabelText('Tags:') as HTMLSelectElement;
      expect(tagsSelect.selectedOptions).toHaveLength(2);
      expect(
        Array.from(tagsSelect.selectedOptions).map((option) => option.value)
      ).toEqual(['Tag 1', 'Tag 3']);
    });
  });
});
