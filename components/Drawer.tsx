'use client';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

export interface DrawerProps {
  isOpen: boolean;
  style: string;
  onClose: () => void;
  children: React.ReactNode;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  backgroundImage: string | null;
}

export default function Drawer(props: DrawerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const iconContainerStyle = {
    backgroundImage: `url('${props.backgroundImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };
  const handlePhotoIconClick = () => {
    fileInputRef.current?.click();
    // eslint-disable-next-line no-console
    console.log('Icon Clicked');
  };
  return (
    <div
      className={`transform-transition absolute left-0 flex h-[calc(100vh-64px)] w-1/3 flex-col bg-slate-50 duration-500 ${props.style}`}
    >
      <div
        className="flex h-64 items-start justify-between bg-purple-300 p-3"
        style={iconContainerStyle}
      >
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute h-9 w-9 rounded-full bg-white bg-opacity-50"></div>
          <PhotoIcon
            className="z-10 h-7 w-7 cursor-pointer stroke-1 text-black"
            aria-hidden="true"
            onClick={handlePhotoIconClick}
          />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={props.onFileSelect}
          style={{ display: 'none' }} // Hide the input element
          accept="image/*" // Accept only images
        />
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute h-9 w-9 rounded-full bg-white bg-opacity-50"></div>
          <XMarkIcon
            className="z-10 h-7 w-7 cursor-pointer stroke-1 text-black"
            aria-hidden="true"
            onClick={props.onClose}
          />
        </div>
      </div>
      {props.children}
    </div>
  );
}
