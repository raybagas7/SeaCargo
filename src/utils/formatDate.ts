export const formatDate = (date: number) => {
  const dateFormat = new Date(date);
  const year = dateFormat.getFullYear();
  const month = dateFormat.getMonth();
  const day = dateFormat.getDate();
  const hours = dateFormat.getHours();
  const minutes = dateFormat.getMinutes();

  return `${day}/${month}/${year}`;
};
