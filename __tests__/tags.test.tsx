import Tags from '@/components/Tags';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Tashan Maniyalaghan Tags Test Function

describe('Tags', () => {
  const mockSelectedTags = {
    tag1: true,
    tag2: false
  };

  const mockSetSelectedTags = jest.fn();

  const setup = () => {
    const utils = render(
      <Tags
        selectedTags={mockSelectedTags}
        setSelectedTags={mockSetSelectedTags}
      />
    );
    const tagsDropdown = screen.getByTestId('tagsDropdown');
    return { tagsDropdown, ...utils };
  };

  it('Renders Tags Drop Down', () => {
    const { tagsDropdown } = setup();
    expect(tagsDropdown).toBeInTheDocument();
  });
});
