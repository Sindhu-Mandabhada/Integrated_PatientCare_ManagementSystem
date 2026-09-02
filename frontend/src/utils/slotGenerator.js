// Convert minutes into readable time
const formatSlotTime = (totalMinutes) => {
  let hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const period = hours >= 12 ? "PM" : "AM";

  if (hours === 0) {
    hours = 12;
  } else if (hours > 12) {
    hours -= 12;
  }

  return `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")} ${period}`;
};


// Generate appointment slots
export const generateSlots = (
  startTime = "09:00",
  endTime = "17:00",
  interval = 30
) => {
  const slots = [];

  const [startHour, startMinute] =
    startTime.split(":").map(Number);

  const [endHour, endMinute] =
    endTime.split(":").map(Number);

  let currentMinutes =
    startHour * 60 + startMinute;

  const endMinutes =
    endHour * 60 + endMinute;

  while (currentMinutes < endMinutes) {
    slots.push({
      value: `${String(
        Math.floor(currentMinutes / 60)
      ).padStart(2, "0")}:${String(
        currentMinutes % 60
      ).padStart(2, "0")}`,

      label: formatSlotTime(currentMinutes)
    });

    currentMinutes += interval;
  }

  return slots;
};


// Generate slots excluding already booked slots
export const getAvailableSlots = (
  startTime,
  endTime,
  interval,
  bookedSlots = []
) => {
  const slots = generateSlots(
    startTime,
    endTime,
    interval
  );

  return slots.filter(
    (slot) =>
      !bookedSlots.includes(slot.value)
  );
};

export default generateSlots;