import Tags from '@/components/Tags';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Tashan Maniyalaghan Tags Test Function

describe('Tags', () => {
  const setup = () => {
    const utils = render(<Tags />);
    const tagsDropdown = screen.getByTestId('tagsDropdown');
    return { tagsDropdown, ...utils };
  };

  it('Renders Tags Drop Down', () => {
    const { tagsDropdown } = setup();
    expect(tagsDropdown).toBeInTheDocument();
  });
});
