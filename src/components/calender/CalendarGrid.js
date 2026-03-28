import { therapists } from "../../data/therapists";
import { bookings } from "../../data/bookings";
import BookingCard from "./BookingCard";

const CalendarGrid = () => {
  const rows = 32;
  const rowHeight = 60;
  const columnWidth = 100;

  const getTop = (time) => {
    const [h, m] = time.split(":").map(Number);
    const totalMinutes = (h - 9) * 60 + m;
    return (totalMinutes / 15) * rowHeight;
  };

  const getHeight = (duration) => {
    return (duration / 15) * rowHeight;
  };

  return (
    <div className="relative min-w-max">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${therapists.length}, ${columnWidth}px)`,
          gridTemplateRows: `repeat(${rows}, ${rowHeight}px)`,
          backgroundImage: `
              linear-gradient(to right, #e5e7eb 1px, transparent 1px),
              linear-gradient(to bottom, #e5e7eb 1px, transparent 1px),
              linear-gradient(to right, #e5e7eb 1px, transparent 1px)
            `,
          backgroundSize: `
            ${columnWidth}px ${rowHeight}px,
            ${columnWidth}px ${rowHeight}px,
            100% 100%
          `,
          backgroundPosition: `
              0 0,
              0 0,
              100% 0
            `,
        }}
      />

      {bookings.map((b) => (
        <div
          key={b.id}
          style={{
            position: "absolute",
            top: getTop(b.start),
            left: (b.therapistId - 1) * columnWidth,
            width: columnWidth,
            height: getHeight(b.duration),
          }}
        >
          <BookingCard booking={b} />
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;
