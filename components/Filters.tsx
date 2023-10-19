import { useState } from 'react';
import Slider from './Slider';

const Filters = () => {
  const [sliderIndex, setSliderIndex] = useState(0);
  //Value in minutes
  const times = [
    '30 mins',
    '1 hour',
    '2 hours',
    '4 hours',
    '6 hours',
    '8 hours',
    '10 hours'
  ];

  return (
    <div>
      <Slider list={times} value={sliderIndex} setValue={setSliderIndex} />
    </div>
  );
};

export default Filters;
