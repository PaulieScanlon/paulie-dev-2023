export const resizeImage = (url, width, height): string => {
  const string = url.split(/upload(?=.)/);
  return `${string[0]}upload/w_${width},h_${height},q_70${string[1]}`;
};
