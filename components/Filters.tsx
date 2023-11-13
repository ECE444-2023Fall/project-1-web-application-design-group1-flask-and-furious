import { FilteredEventData } from '@/app/events/find/feed/page';
import { Input, Slider, Switch } from '@nextui-org/react';
import React, { useCallback, useEffect } from 'react';
import Tags from './Tags';

type Props = {
  setEvents: React.Dispatch<React.SetStateAction<FilteredEventData[]>>;
  tags: Record<string, boolean>;
  setTags: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

//Going to need to set a hidden flag for the events that are filtered out
const Filters = ({ setEvents, tags, setTags }: Props) => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [rsvp, setRSVP] = React.useState(false);
  const [dateSlider, setDateSlider] = React.useState<number[]>([0, 366]);
  const [timeSlider, setTimeSlider] = React.useState<number[]>([0, 24]);
  const [durationSlider, setDurationSlider] = React.useState(24);

  const searchFilter = useCallback((event: FilteredEventData) => {
    return event.Title.toLowerCase().includes(searchValue.toLowerCase());
  }, []);

  //TODO: get users rsvp'd events and filter by that
  // const rsvpFilter = useCallback((event: FilteredEventData) => {
  //   return !rsvp || event.RSVP;
  // }, []);

  const dateFilter = useCallback(
    (event: FilteredEventData) => {
      const dayOfYear = (date: Date): number =>
        Math.floor(
          (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
            1000 /
            60 /
            60 /
            24
        );

      return (
        dayOfYear(new Date(event.Date)) >= dateSlider[0] &&
        dayOfYear(new Date(event.Date)) < dateSlider[1]
      );
    },
    [dateSlider]
  );

  const timeFilter = useCallback(
    (event: FilteredEventData) => {
      //Start Time and End Time is of form HH:MM:00
      //Values are of form [HH, HH]
      const startTimeSplit = event.StartTime.split(':');
      const startTime =
        Number(startTimeSplit[0]) + Number(startTimeSplit[1]) / 100;
      const endTimeSplit = event.EndTime.split(':');
      const endTime = Number(endTimeSplit[0]) + Number(endTimeSplit[1]) / 100;
      return (
        Number(startTime) >= timeSlider[0] && Number(endTime) <= timeSlider[1]
      );
    },
    [timeSlider]
  );

  const durationFilter = useCallback(
    (event: FilteredEventData) => {
      const startTimeSplit = event.StartTime.split(':');
      const startTime =
        Number(startTimeSplit[0]) + Number(startTimeSplit[1]) / 100;
      const endTimeSplit = event.EndTime.split(':');
      const endTime = Number(endTimeSplit[0]) + Number(endTimeSplit[1]) / 100;
      const duration = endTime - startTime;
      return duration <= durationSlider;
    },
    [durationSlider]
  );

  const tagsFilter = useCallback(
    (event: FilteredEventData) => {
      //Make sure all the tags selected are in the event tags
      //tags is of form {tag1: true, tag2: false}
      const selectedTags = Object.keys(tags).filter((tag) => tags[tag]);
      return selectedTags.every((tag) => event.Tags.includes(tag));
    },
    [tags]
  );

  useEffect(() => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => ({
        ...event,
        hidden:
          !searchFilter(event) ||
          !dateFilter(event) ||
          !timeFilter(event) ||
          !durationFilter(event) ||
          !tagsFilter(event)
      }))
    );
  }, [
    searchValue,
    rsvp,
    dateSlider,
    timeSlider,
    durationSlider,
    setEvents,
    searchFilter,
    dateFilter,
    timeFilter,
    durationFilter,
    tagsFilter
  ]);

  return (
    <div className="mt-2 flex flex-col items-center gap-6">
      {/* TODO: add rest of search and filter components */}
      {/* <SearchBar events={events} setEvents={setEvents} /> */}
      <h2 className="ml-4 self-start text-2xl font-bold">Search and Filters</h2>
      <div className="flex gap-4">
        <Input
          label="Search"
          onValueChange={(value) => {
            setSearchValue(value);
          }}
          radius="lg"
          classNames={{
            base: 'w-3/4',
            label: 'text-black/50 p-1',
            input: [
              'bg-transparent',
              'text-black/90',
              'placeholder:text-default-700'
            ],
            innerWrapper: 'bg-transparent',
            inputWrapper: [
              'bg-default-200/50',
              'backdrop-saturate-200',
              'hover:bg-default-200/70'
            ]
          }}
          placeholder="Type to search..."
          startContent={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className=" h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
        <span className="mr-[-10px] self-center font-bold">RSVP&apos;d</span>
        <Switch
          size="lg"
          onChange={(value) => {
            setRSVP(value.target.checked);
          }}
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`${className} h-4 w-4`}
              >
                <path
                  fillRule="evenodd"
                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`${className} h-4 w-4`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            )
          }
        />
      </div>

      <Slider
        label={
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-2">Date</span>
          </div>
        }
        step={1}
        marks={[
          { value: 1, label: 'Jan' },
          { value: 32, label: 'Feb' },
          { value: 60, label: 'Mar' },
          { value: 91, label: 'Apr' },
          { value: 121, label: 'May' },
          { value: 152, label: 'Jun' },
          { value: 182, label: 'Jul' },
          { value: 213, label: 'Aug' },
          { value: 244, label: 'Sep' },
          { value: 274, label: 'Oct' },
          { value: 305, label: 'Nov' },
          { value: 335, label: 'Dec' }
        ]}
        onChange={(value) => {
          //Make sure the event date is between the two values
          setDateSlider(value as number[]);
        }}
        getValue={(value) => {
          const dateFormatOptions: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          };
          //Convert the number of the year to the month and date
          const initDates = [new Date(2023, 0, 1), new Date(2023, 0, 1)];
          const dates = initDates.map(
            (initDate, index) =>
              new Date(initDate.setDate(Number((value as number[])[index])))
          );
          const dateRangeString = `${dates[0].toLocaleDateString(
            undefined,
            dateFormatOptions
          )} - ${dates[1].toLocaleDateString(undefined, dateFormatOptions)}`;
          return dateRangeString;
        }}
        minValue={1}
        maxValue={366}
        defaultValue={[14, 103]}
        className="max-w-md"
      />
      <Slider
        label={
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="ml-2">Time</span>
          </div>
        }
        step={1}
        marks={[
          { value: 0, label: '12am' },
          { value: 3, label: '3am' },
          { value: 6, label: '6am' },
          { value: 9, label: '9am' },
          { value: 12, label: '12pm' },
          { value: 15, label: '3pm' },
          { value: 18, label: '6pm' },
          { value: 21, label: '9pm' },
          { value: 24, label: '12pm' }
        ]}
        getValue={(value) => {
          //Convert 24hr time to 12hr time
          const times = (value as number[]).map((time) => time % 12 || 12);
          const timeRangeString = `${times[0]}${
            (value as number[])[0] >= 12 ? 'pm' : 'am'
          } - ${times[1]}${(value as number[])[1] >= 12 ? 'pm' : 'am'}`;
          return timeRangeString;
        }}
        onChange={(value) => {
          setTimeSlider(value as number[]);
        }}
        minValue={0}
        maxValue={24}
        defaultValue={[14, 23]}
        className="max-w-md"
      />
      <Slider
        label={
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.07,16.07,0,0,0,6.4,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16.09,16.09,0,0,0-6.35-12.77L141.27,128l52.38-39.59A16.09,16.09,0,0,0,200,75.64ZM184,40V64H72V40Zm0,176H72V180l56-42,56,42.35Z"></path>
            </svg>
            <span className="ml-2">Duration</span>
          </div>
        }
        marks={[
          { value: 0.5, label: '30m' },
          { value: 4, label: '4h' },
          { value: 8, label: '8h' },
          { value: 12, label: '12h' },
          { value: 16, label: '16h' },
          { value: 20, label: '20h' },
          { value: 24, label: '24h' }
        ]}
        getValue={(value) => {
          //Convert 12.5 for example to 12h 30m
          const hours = Math.floor(value as number);
          const minutes = (value as number) % 1;
          const durationString = `${hours}h ${minutes * 60}m`;
          return durationString;
        }}
        onChange={(value) => {
          setDurationSlider(value as number);
        }}
        step={0.5}
        minValue={0.5}
        maxValue={24}
        defaultValue={14}
        className="max-w-md"
      />
      {/* <Duration sliderValue={sliderValue} setSliderValue={setSliderValue} /> */}
      <div className="w-3/4">
        <Tags selectedTags={tags} setSelectedTags={setTags} />
      </div>
    </div>
  );
};

export default Filters;
