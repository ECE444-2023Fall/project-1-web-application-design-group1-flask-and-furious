import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Tags from './Tags';

const defaultImage =
  'https://yqrgbzoauzaaznsztnwb.supabase.co/storage/v1/object/public/Images/no-image';
export interface formData {
  eventId: number;
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  date: string;
  frequency: string;
  file: File | null;
  tags: string[];
}

export interface formProps {
  Post: (formData: formData) => void;
  initialFormData: formData;
  Update: (formData: formData) => void;
  isNewEvent: boolean;
  onClose: () => void;
  Delete: (formData: formData) => void;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  backgroundImage: string | null;
}

export default function EventForm(props: formProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClientComponentClient();

  const [isDelete, setIsDelete] = useState<boolean>(true);
  const [tagOptions, setTagOptions] = useState<Record<string, boolean>>({});
  const [backgroundImage, setBackgroundImage] = useState(defaultImage);
  const [formData, setFormData] = useState<formData>({
    eventId: -1,
    title: '',
    description: '',
    location: '',
    startTime: '',
    endTime: '',
    date: '',
    frequency: '',
    file: null,
    tags: []
  });

  useEffect(() => {
    const getTags = async () => {
      const { data } = await supabase.from('Tags').select();

      //Convert data from {0: {id: 1, tag: 'tag1'}, 1: {id: 2, tag: 'tag2'}} to {tag1: false, tag2: false}

      if (data) {
        const sortedTags = data.sort((a, b) => a.tag.localeCompare(b.tag));
        setTagOptions(
          Object.fromEntries(sortedTags.map((tag) => [tag.tag, false]))
        );
      }
    };

    getTags();
  }, []);

  useEffect(() => {
    //Keeps track of selected tags in the form data
    setFormData((prevState) => ({
      ...prevState,
      tags: Object.keys(tagOptions).filter((tag) => tagOptions[tag])
    }));
  }, [tagOptions]);

  useEffect(() => {
    setFormData(props.initialFormData);
  }, [props.initialFormData]);

  useEffect(() => {
    if (props.backgroundImage) {
      const img = new Image();
      img.src = props.backgroundImage.startsWith('blob:')
        ? props.backgroundImage
        : `${props.backgroundImage}?time=${Date.now()}`;
      img.onload = () => setBackgroundImage(img.src);
      img.onerror = () => setBackgroundImage(defaultImage);
    }
  }, [props.backgroundImage]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'select-multiple') {
      // Cast the event target to HTMLSelectElement to access options property
      const selectElement = e.target as HTMLSelectElement;

      // Extract the selected values and convert them into an array
      const selectedOptions = Array.from(selectElement.options).filter(
        (option) => option.selected
      );
      const selectedValues = selectedOptions.map((option) => option.value);

      setFormData({
        ...formData,
        [name]: selectedValues
      });
    } else {
      if (name === 'startTime' || name === 'endTime') {
        setFormData({
          ...formData,
          [name]: value + ':00'
        });
      } else {
        setFormData({
          ...formData,
          [name]: value
        });
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    //console.log(formData);
    try {
      if (props.isNewEvent) {
        props.Post(formData);
      } else {
        if (isDelete) {
          props.Delete(formData);
        } else {
          props.Update(formData);
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error while calling the backend:', error);
    }
  };

  const handlePhotoIconClick = () => {
    fileInputRef.current?.click();
    // eslint-disable-next-line no-console
    console.log('Icon Clicked');
  };

  return (
    <div className="flex flex-grow flex-col items-center bg-slate-50">
      <div
        className="flex h-64 w-full items-start justify-between bg-purple-300 p-3"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
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
      <form onSubmit={handleSubmit} className="flex flex-col p-6">
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
            htmlFor="startTime"
            className="mr-2 text-lg font-bold text-violet-700"
          >
            Start Time:
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-2/3 rounded border border-gray-300 p-2"
          />
        </div>
        <div className="mb-4 flex items-start justify-between">
          <label
            htmlFor="endTime"
            className="mr-2 text-lg font-bold text-violet-700"
          >
            End Time:
          </label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
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
          <select
            id="frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="w-2/3 rounded border border-gray-300 p-2"
          >
            <option value="">Select Frequency</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Biweekly">Biweekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
        <div className="mb-4 flex items-start justify-between">
          <Tags selectedTags={tagOptions} setSelectedTags={setTagOptions} />
        </div>
        <div className="mt-auto flex justify-between">
          {props.initialFormData.eventId >= 0 && (
            <button
              onClick={() => setIsDelete(true)}
              type="submit"
              className="rounded-md bg-red-500 px-3 py-1 text-white"
            >
              Delete
            </button>
          )}

          <button
            onClick={() => setIsDelete(false)}
            type="submit"
            className="rounded-md bg-primary px-3 py-1 text-white hover:bg-violet-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
