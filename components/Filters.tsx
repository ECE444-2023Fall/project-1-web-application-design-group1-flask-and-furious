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
      {/* TODO: add rest of search and filter components */}
      <Slider list={times} value={sliderIndex} setValue={setSliderIndex} />
    </div>
  );
};

export default Filters;
