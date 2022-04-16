export const getDateAndTime = (timestamp) => {
  const createdDate = new Date(timestamp)
    .toLocaleDateString("en-GB")
    .split("/")
    .reverse()
    .join("-");
  const createdTime = new Date(timestamp).toLocaleTimeString("en-GB");

  return `${createdDate} at ${createdTime}`;
};
