function convertTo12HourFormat(dateString) {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Get the day of the week and month name
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  // Get the time in 12-hour format with AM/PM
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  // Combine the formatted date and time
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return formattedDateTime;
}
export default convertTo12HourFormat;
