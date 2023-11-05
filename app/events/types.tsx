//Change the id key of the EventCard component to be the eventId from the database.

export interface EventData {
  eventId: Database['public']['Tables']['Events']['Row']['id'];
  title: Database['public']['Tables']['Events']['Row']['Title'];
  owner: Database['public']['Tables']['Events']['Row']['Owner'];
  description: Database['public']['Tables']['Events']['Row']['Description'];
  location: Database['public']['Tables']['Events']['Row']['Location'];
  startTime: Database['public']['Tables']['Events']['Row']['StartTime'];
  endTime: Database['public']['Tables']['Events']['Row']['EndTime'];
  date: Database['public']['Tables']['Events']['Row']['Date'];
  frequency: Database['public']['Tables']['Events']['Row']['Frequency'];
  tags: Database['public']['Tables']['Events']['Row']['Tags'];
}
