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
  image_url: string;
  Latitude: number;
  Longitude: number;
}

export interface formData {
  eventId: number;
  title: string;
  description: string;
  location: string | undefined;
  latitude: number;
  longitude: number;
  startTime: string;
  endTime: string;
  date: string;
  frequency: string;
  file: File | null;
  tags: string[];
}
