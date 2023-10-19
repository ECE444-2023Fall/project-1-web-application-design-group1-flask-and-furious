'use client';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChangeEvent, FormEvent, useState } from 'react';

export interface DrawerProps {
  isOpen: boolean;
  style: string;
  onClose: () => void;
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
      <EventForm onClose={props.onClose} />
    </div>
  );
}

function EventForm(props: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    time: '',
    date: '',
    frequency: '',
    tags: ''
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Send the formData to your server or perform any desired action
    console.log(formData);
    props.onClose();
  };

  return (
    <div className="flex-grow items-center bg-slate-50">
      <form onSubmit={handleSubmit} className="flex w-full flex-col p-6">
        <div className="mb-4 flex items-start justify-between">
          <label
            htmlFor="title"
            className="mr-2 text-lg font-bold text-violet-700"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-2/3 rounded border border-gray-300 p-2"
          />
        </div>
        <div className="mb-4 flex items-start justify-between">
          <label
            htmlFor="description"
            className="mr-2 text-lg font-bold text-violet-700"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-2/3 rounded border border-gray-300 p-2"
          />
        </div>
        <div className="mb-4 flex items-start justify-between">
          <label
            htmlFor="location"
            className="mr-2 text-lg font-bold text-violet-700"
          >
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-2/3 rounded border border-gray-300 p-2"
          />
        </div>
        <div className="mb-4 flex items-start justify-between">
          <label
            htmlFor="time"
            className="mr-2 text-lg font-bold text-violet-700"
          >
            Time:
          </label>
          <input
            type="text"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-2/3 rounded border border-gray-300 p-2"
          />
        </div>
        <div className="mb-4 flex items-start justify-between">
          <label
            htmlFor="date"
            className="mr-2 text-lg font-bold text-violet-700"
          >
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-2/3 rounded border border-gray-300 p-2"
          />
        </div>
        <div className="mb-4 flex items-start justify-between">
          <label
            htmlFor="frequency"
            className="mr-2 text-lg font-bold text-violet-700"
          >
            Frequency:
          </label>
          <input
            type="text"
            id="frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="w-2/3 rounded border border-gray-300 p-2"
          />
        </div>
        <div className="mb-4 flex items-start justify-between">
          <label
            htmlFor="tags"
            className="mr-2 text-lg font-bold text-violet-700"
          >
            Tags:
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-2/3 rounded border border-gray-300 p-2"
          />
        </div>
        <div className="absolute bottom-3 right-3">
          <button
            type="submit"
            className="rounded-md bg-violet-700 px-3 py-1 text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
