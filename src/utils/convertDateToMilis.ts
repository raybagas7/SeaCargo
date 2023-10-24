export const convertDateToMilis = (dateString: string) => {
  const date = new Date(dateString);
  return date.getTime();
};
