import { useState } from "react";
import { therapists } from "../../data/therapists";
import { bookings } from "../../data/bookings";
import BookingCard from "./BookingCard";
import { useFilters } from "../../context/FilterContext";
import BookingPanel from "./BookingPanel";
import { blockedSlots } from "../../data/blockedSlots";
import CreateBookingPanel from "./CreateBookingPanel";
import EditBookingPanel from "./EditBookingPanel";
import CancelDeletePanel from "./CancelDeletePanel";

const CalendarGrid = () => {
  const { filters } = useFilters();
  const [editBooking, setEditBooking] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [allBookings, setAllBookings] = useState(bookings);
  const [cancelBooking, setCancelBooking] = useState(null);

  const rows = 32;
  const rowHeight = 60;
  const columnWidth = 100;

  const filteredallBookings = allBookings.filter((b) => {
    const matchStatus =
      filters.status.length === 0 || filters.status.includes(b.status);

    const matchTherapist =
      filters.therapists.length === 0 ||
      filters.therapists.includes(b.therapistId);

    const matchSearch =
      !filters.search ||
      b.client.toLowerCase().includes(filters.search.toLowerCase()) ||
      b.phone.includes(filters.search);

    return matchStatus && matchTherapist && matchSearch;
  });

  const getTop = (time) => {
    const [h, m] = time.split(":").map(Number);
    const totalMinutes = (h - 9) * 60 + m;
    return (totalMinutes / 15) * rowHeight;
  };

  const getHeight = (duration) => {
    return (duration / 15) * rowHeight;
  };

  const handleCellClick = (therapistId, rowIndex) => {
    const hours = 9 + Math.floor((rowIndex * 15) / 60);
    const minutes = (rowIndex * 15) % 60;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes,
    ).padStart(2, "0")}`;

    setSelectedBooking(null);
    setCreateData({
      therapistId,
      start: formattedTime,
    });
  };

  const handleOutsideClick = () => {
    setSelectedBooking(null);
    setCreateData(null);
  };

  const handleDeleteBooking = (id) => {
    setAllBookings((prev) => prev.filter((b) => b.id !== id));
    setCancelBooking(null);
  };

  const handleUpdateBooking = (updated) => {
    setAllBookings((prev) =>
      prev.map((b) => (b.id === updated.id ? updated : b)),
    );
  };
  return (
    <div className="relative min-w-max" onClick={handleOutsideClick}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${therapists.length}, ${columnWidth}px)`,
          gridTemplateRows: `repeat(${rows}, ${rowHeight}px)`,
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: `${columnWidth}px ${rowHeight}px`,
        }}
      />

      {therapists.map((t, colIndex) =>
        Array.from({ length: rows }).map((_, rowIndex) => {
          const top = rowIndex * rowHeight;
          const left = colIndex * columnWidth;

          return (
            <div
              key={`${t.id}-${rowIndex}`}
              onClick={(e) => {
                e.stopPropagation();
                handleCellClick(t.id, rowIndex);
              }}
              className="absolute hover:bg-[#f9fafb] cursor-pointer"
              style={{
                top,
                left,
                width: columnWidth,
                height: rowHeight,
              }}
            />
          );
        }),
      )}

      {blockedSlots.map((slot, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: getTop(slot.start),
            left: (slot.therapistId - 1) * columnWidth,
            width: columnWidth,
            height: getHeight(slot.duration),
          }}
          className="bg-[#E5E7EB]"
        />
      ))}

      {filteredallBookings.map((b) => (
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
          <BookingCard
            booking={b}
            onClick={(booking) => {
              setCreateData(null);
              setSelectedBooking(booking);
            }}
          />
        </div>
      ))}

      {selectedBooking && !createData && !editBooking && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="absolute right-0 top-0 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <BookingPanel
              booking={selectedBooking}
              onClose={() => setSelectedBooking(null)}
              onEdit={(b) => {
                setSelectedBooking(null);
                setEditBooking(b);
              }}
              onCancel={(b) => {
                setSelectedBooking(null);
                setCancelBooking(b);
              }}
            />
          </div>
        </div>
      )}

      {editBooking && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setEditBooking(null)}
        >
          <div
            className="absolute right-0 top-0 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <EditBookingPanel
              booking={editBooking}
              onClose={() => setEditBooking(null)}
              onSave={handleUpdateBooking}
            />
          </div>
        </div>
      )}

      {createData && (
        <div className="fixed inset-0 z-50" onClick={() => setCreateData(null)}>
          <div
            className="absolute right-0 top-0 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <CreateBookingPanel
              createData={createData}
              onClose={() => setCreateData(null)}
            />
          </div>
        </div>
      )}
      {cancelBooking && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setCancelBooking(null)}
        >
          <div
            className="absolute right-0 top-0 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <CancelDeletePanel
              booking={cancelBooking}
              onClose={() => setCancelBooking(null)}
              onDelete={handleDeleteBooking}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarGrid;
