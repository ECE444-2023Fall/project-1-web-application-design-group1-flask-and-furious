'use client';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface DrawerProps {
  isOpen: boolean;
  style: string;
  onClose: () => void;
  children: React.ReactNode;
  // data: eventData
}

export default function Drawer(props: DrawerProps) {
  return (
    <div className={`overflow-y-auto ${props.style}`}>
      <div className="items-top flex h-52 justify-between bg-violet-400 p-3">
        <PhotoIcon
          className="h-7 w-7 stroke-1 text-black "
          aria-hidden="true"
        />
        <XMarkIcon
          className="h-7 w-7 stroke-1 text-black"
          aria-hidden="true"
          onClick={props.onClose}
        />
      </div>
      {props.children}
    </div>
  );
}
