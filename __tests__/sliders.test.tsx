'use client';
import Slider, { Props } from '@/components/Slider';
import { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Slider', () => {
  it('Renders Event Name', async () => {
    const props: Props = {
      value: 1,
      setValue: useState(0)[1],
      list: ['1 hour', '2 hours', '3 hours', '4 hours', '5 hours']
    };

    render(<Slider {...props} />);

    const heading = screen.getByRole('heading', {
      name: /Awesome Concert/i
    });

    expect(heading).toBeInTheDocument();
  });
});
