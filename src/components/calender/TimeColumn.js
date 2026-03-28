const generateTimeSlots = () => {
  const slots = [];
  let hour = 9;
  let minutes = 0;

  for (let i = 0; i < 32; i++) {
    const period = hour >= 12 ? "PM" : "AM";

    const displayHour = hour > 12 ? hour - 12 : hour;
    const h = displayHour.toString().padStart(2, "0");
    const m = minutes.toString().padStart(2, "0");

    slots.push({
      time: `${h}.${m}`,
      period,
    });

    minutes += 15;
    if (minutes === 60) {
      minutes = 0;
      hour++;
    }
  }

  return slots;
};

const TimeColumn = () => {
  const timeSlots = generateTimeSlots();

  return (
    <div className="w-[80px] bg-white border-r border-gray-200 flex-shrink-0">
      {timeSlots.map((slot, i) => (
        <div
          key={i}
          className="h-[60px] bg-white border-b border-gray-100 flex flex-col items-center justify-center text-center"
        >
          <div className="text-[12px] font-medium text-gray-600">
            {slot.time} {slot.period}
          </div>

          <div className="text-[9px] text-gray-400 leading-none">23F 25M</div>
        </div>
      ))}
    </div>
  );
};

export default TimeColumn;
