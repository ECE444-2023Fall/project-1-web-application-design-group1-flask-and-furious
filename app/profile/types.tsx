export interface ProfileData {
  profileId: Database['public']['Tables']['Profiles']['Row']['id'];
  first_name: Database['public']['Tables']['Profiles']['Row']['first_name'];
  last_name: Database['public']['Tables']['Profiles']['Row']['last_name'];
  age: Database['public']['Tables']['Profiles']['Row']['age'];
  gender: Database['public']['Tables']['Profiles']['Row']['gender'];
  city: Database['public']['Tables']['Profiles']['Row']['city'];
  university: Database['public']['Tables']['Profiles']['Row']['university'];
  program: Database['public']['Tables']['Profiles']['Row']['program'];
  pictureUrl: Database['public']['Tables']['Profiles']['Row']['pictureUrl'];
  tags: Database['public']['Tables']['Profiles']['Row']['tags'];
}
