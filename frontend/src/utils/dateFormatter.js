// Format date as DD/MM/YYYY
export const formatDate = (date) => {
  if (!date) {
    return "N/A";
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};


// Format date as readable text
// Example: 01 Sep 2026
export const formatReadableDate = (date) => {
  if (!date) {
    return "N/A";
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "Invalid date";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};


// Format time
// Example: 10:30 AM
export const formatTime = (time) => {
  if (!time) {
    return "N/A";
  }

  const parsedDate = new Date(`1970-01-01T${time}`);

  if (isNaN(parsedDate.getTime())) {
    return time;
  }

  return parsedDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
};


// Format date and time together
export const formatDateTime = (date, time) => {
  if (!date) {
    return "N/A";
  }

  const formattedDate = formatReadableDate(date);

  if (!time) {
    return formattedDate;
  }

  return `${formattedDate} • ${formatTime(time)}`;
};


// Get today's date in YYYY-MM-DD
export const getToday = () => {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};