'use client';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface formData {
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  date: string;
  frequency: string;
  tags: string[];
}

export interface DrawerProps {
  isOpen: boolean;
  style: string;
  onClose: () => void;
  children: React.ReactNode;
  // data: eventData
  Post: (formData: formData) => void;
}

export default function Drawer(props: DrawerProps) {
  return (
    <div
      className={`transform-transition absolute left-0 flex h-[calc(100vh-64px)] w-1/3 flex-col bg-slate-50 duration-500 ${props.style}`}
    >
      <div className="items-top flex h-52 justify-between bg-violet-400 p-3">
        <PhotoIcon
          className="h-7 w-7 stroke-1 text-black "
          aria-hidden="true"
        />
        <XMarkIcon
          className="h-7 w-7 cursor-pointer stroke-1 text-black"
          aria-hidden="true"
          onClick={props.onClose}
        />
      </div>
      {props.children}
    </div>
  );
}
