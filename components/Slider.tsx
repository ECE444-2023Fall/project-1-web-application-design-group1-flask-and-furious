'use client';
import React from 'react';

type Props = {
  value: { [key: number]: string };
  setValue: React.Dispatch<React.SetStateAction<{ [key: number]: string }>>;
  list: Array<string>;
};

const Slider = ({ value, setValue, list }: Props) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ [Number(e.target.value)]: list[Number(e.target.value)] });
  };

  return (
    <div className="mx-7 text-black">
      <p className="text-center italic">
        {value[Number(Object.keys(value)[0])]}
      </p>
      <input
        type="range"
        min={0}
        max={list.length - 1}
        value={Object.keys(value)[0]}
        onChange={handleSliderChange}
        className="range range-primary range-xs"
        step={1}
        aria-label="slider-input"
      />
      <div className="flex w-full justify-between px-2 text-[6px]">
        {list.map((value) => (
          <span key={value}>|</span>
        ))}
      </div>
      <div className="mt-1 flex w-full justify-between px-2 text-xs">
        <p className="ml-[-16px]">{list[0]}</p>
        <p className="mr-[-32px]">{list[list.length - 1]}</p>
      </div>
    </div>
  );
};

export default Slider;
