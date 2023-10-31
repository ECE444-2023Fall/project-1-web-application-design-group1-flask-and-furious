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
