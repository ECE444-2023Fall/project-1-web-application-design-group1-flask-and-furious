import Slider from '@/components/Slider';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

// Rowan Honeywell

describe('Slider', () => {
  const setStateMock = jest.fn();
  const props = {
    value: 2,
    setValue: setStateMock,
    list: ['1 hour', '2 hours', '3 hours', '4 hours', '5 hours']
  };

  const setup = () => {
    const utils = render(<Slider {...props} />);
    const input = screen.getByLabelText('slider-input');
    return { input, ...utils };
  };

  it('Renders Slider Correctly', async () => {
    const { getByText } = setup();
    expect(getByText('3 hours')).toBeInTheDocument();
  });

  it('Change Event Gets Fired', () => {
    const { input } = setup();
    fireEvent.change(input, { target: { value: '1' } });
    expect(setStateMock).toHaveBeenCalled();
  });
});
