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

export interface formData {
  eventId: number;
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  date: string;
  frequency: string;
  tags: string[];
}
