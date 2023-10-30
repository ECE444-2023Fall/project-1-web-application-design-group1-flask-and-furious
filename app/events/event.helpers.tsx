export interface EventData {
  id: number;
  created_at: string;
  Owner: string;
  Title: string;
  Description: string;
  Location: string;
  StartTime: string;
  EndTime: string;
  Frequency: string;
  Tags: string[];
  Date: string;
}

export const formatTime = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  const parsedTime = new Date();
  parsedTime.setHours(parseInt(hours, 10));
  parsedTime.setMinutes(parseInt(minutes, 10));
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  return parsedTime.toLocaleTimeString([], options);
};

export interface formData {
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  date: string;
  frequency: string;
  tags: string[];
}
