import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from '@supabase/gotrue-js';

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

export const userUuidFromSession = async (session: Session | null) => {
  const supabase = createClientComponentClient();

  const token = session?.access_token;
  const user = await supabase.auth.getUser(token);
  return user.data.user?.id;
};
