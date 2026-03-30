const generateTimeSlots = () => {
  const slots = [];
  let hour = 9;
  let minutes = 0;

  for (let i = 0; i < 52; i++) {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour;
    const h = displayHour.toString().padStart(2, "0");
    const m = minutes.toString().padStart(2, "0");
    const isOnTheHour = minutes === 0;

    slots.push({ time: `${h}.${m}`, period, isOnTheHour });

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
    <>
      {timeSlots.map((slot, i) => (
        <div
          key={i}
          className={`flex flex-col items-start justify-start pl-3 pt-1 border-b ${
            slot.isOnTheHour ? "border-gray-200" : "border-gray-100"
          }`}
          style={{ height: 60, width: 80 }}
        >
          {slot.isOnTheHour && (
            <div className="flex flex-col leading-none gap-[2px]">
              <span className="text-[12px] font-bold text-[#6B7280]">
                {slot.time}
              </span>
              <span className="text-[10px] font-bold text-[#6B7280]">
                {slot.period}
              </span>
              <span className="text-[9px] font-bold text-[#9CA3AF] mt-[2px]">
                23F 25M
              </span>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default TimeColumn;


