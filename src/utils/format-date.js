export const formatDate = (dateString, showTime = false) => {
  const date = new Date(dateString);

  const month = date.toLocaleString('en-US', { timeZone: 'UTC', month: 'long' });
  const day = date.getDate();
  const year = date.getUTCFullYear();
  const time = date.toLocaleTimeString();

  return `${month} ${day}, ${year} ${showTime ? `@${time}` : ''}`;
};
