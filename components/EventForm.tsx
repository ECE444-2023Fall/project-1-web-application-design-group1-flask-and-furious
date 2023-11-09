import { SearchBox } from '@mapbox/search-js-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Tags from './Tags';

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
  onClose: () => void;
  Post: (formData: formData) => void;
  initialFormData: formData;
  Update: (formData: formData) => void;
  isNewEvent: boolean;
  Delete: (formData: formData) => void;
}

export default function EventForm(props: formProps) {
  const [isDelete, setIsDelete] = useState<boolean>(true);
  const supabase = createClientComponentClient();
  const [tagOptions, setTagOptions] = useState<Record<string, boolean>>({});

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
      props.onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error while calling the backend:', error);
    }
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
          <form>
            <SearchBox
              accessToken={
                'pk.eyJ1IjoicmFjZWZuIiwiYSI6ImNsbm5pY241ZTA1b3cyd3F6MmxrMmd2aHYifQ.CuLMjRl3fvGDPxX_jGUGjw'
              }
              value={formData.location}
              onChange={(val) =>
                setFormData({
                  ...formData,
                  ['location']: val
                })
              }
            />
          </form>
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
        {props.initialFormData.eventId >= 0 && (
          <div className="absolute bottom-3 left-3">
            <button
              onClick={() => setIsDelete(true)}
              type="submit"
              className="rounded-md bg-red-500 px-3 py-1 text-white"
            >
              Delete
            </button>
          </div>
        )}
        <div className="absolute bottom-3 right-3">
          <button
            onClick={() => setIsDelete(false)}
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
