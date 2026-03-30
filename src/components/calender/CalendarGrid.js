import React, { useMemo, useState } from "react";
import { useData } from "../../context/DataContext";
import { useFilters } from "../../context/FilterContext";
import BookingCard from "./BookingCard";
import EditBookingPanel from "./EditBookingPanel";
import CreateBookingPanel from "./CreateBookingPanel";

const CalendarGrid = () => {
  const { therapists, bookings: rawBookings, currentDate } = useData();
  const { filters } = useFilters();
  const [editBooking, setEditBooking] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [cancelBooking, setCancelBooking] = useState(null);

  const rows = 52;
  const rowHeight = 60;
  const columnWidth = 100;

  const extractTime = (val) => {
    if (!val) return "09:00";
    const match = val.match(/(\d{2}:\d{2})/);
    return match ? match[1] : "09:00";
  };

  const normalizeDate = (d) => {
    if (!d) return "";
    const p = d.split(" ")[0];
    const s = p.split("-");
    if (s[0].length === 4) return `${s[2]}-${s[1]}-${s[0]}`;
    return p;
  };

  const normalizeStatus = (s) => {
    const val = String(s || "").toLowerCase();
    if (val.includes("progress") || val.includes("check-in")) return "in_progress";
    if (val.includes("confirm")) return "confirmed";
    if (val.includes("complete")) return "completed";
    if (val.includes("cancel")) return "cancelled";
    if (val.includes("no-show")) return "no-show";
    return val || "confirmed";
  };

  const allBookings = useMemo(() => {
    const flattened = [];
    if (!Array.isArray(rawBookings)) return [];

    rawBookings.forEach((itemOrGroup) => {
      let items = [];
      const bi = itemOrGroup.booking_item || itemOrGroup.booking_items || itemOrGroup.items;
      
      if (Array.isArray(bi)) {
        items = bi;
      } else if (bi && typeof bi === 'object') {
        Object.values(bi).forEach(val => {
          if (Array.isArray(val)) items.push(...val);
          else if (val && typeof val === 'object') items.push(val);
        });
      }
      
      if (items.length === 0) {
        items = [itemOrGroup];
      }

      items.forEach((item) => {
        const bDate = (item.service_at || item.start_at || item.date || itemOrGroup.service_at || "").split(' ')[0];
        
        if (bDate && normalizeDate(bDate) !== normalizeDate(currentDate)) return;

        const tIdRaw = item.therapist_id || item.staff_id || item.therapist?.id || 
                       itemOrGroup.therapist_id || itemOrGroup.staff_id || itemOrGroup.therapist?.id;
        
        const finalTId = tIdRaw ? Number(tIdRaw) : null;
        
        const tNameRaw = item.therapist_name || item.staff_name || item.therapist?.name ||
                         itemOrGroup.therapist_name || itemOrGroup.staff_name || itemOrGroup.therapist?.name;

        const bPhone = item.mobile_number || itemOrGroup.mobile_number || "No Phone";
        const bClient = item.customer_name || itemOrGroup.customer_name || "No Name";
        const bService = item.service_name || item.service || item.item_name || 
                         itemOrGroup.service_name || itemOrGroup.service || itemOrGroup.item_name || "";

        flattened.push({
          ...item,
          id: item.booking_id || item.id || Math.random(),
          therapistId: finalTId,
          therapistName: tNameRaw || null,
          date: bDate,
          phone: bPhone,
          client: bClient,
          service: bService,
          start: extractTime(item.start_at || item.start || item.start_time || itemOrGroup.start_at || "09:00"),
          duration: parseInt(item.duration || itemOrGroup.duration) || 60,
          status: normalizeStatus(item.status || itemOrGroup.status || "confirmed"),
          });
      });
    });

    return flattened.map((b) => {
      const concurrent = flattened.filter(
        (other) => other.therapistId === b.therapistId && other.start === b.start
      );
      const pos = concurrent.indexOf(b);
      return {
        ...b,
        widthFactor: 1 / (concurrent.length || 1),
        offsetFactor: pos / (concurrent.length || 1),
      };
    });
  }, [rawBookings, therapists, currentDate]);

  const finalTherapists = useMemo(() => {
    const list = [...therapists];
    allBookings.forEach(b => {
      if (b.therapistId && !list.find(t => Number(t.id) === Number(b.therapistId))) {
        list.push({ 
          id: Number(b.therapistId), 
          name: b.therapistName || `T-${b.therapistId}`, 
          gender: 'Male' 
        });
      }
    });
    return list;
  }, [therapists, allBookings]);

  const getTop = (time) => {
    if (!time) return 0;
    const [h, m] = time.split(":").map(Number);
    const totalMinutes = (h - 9) * 60 + m;
    return (totalMinutes / 15) * rowHeight;
  };

  const getHeight = (duration) => {
    return (duration / 15) * rowHeight;
  };

  const handleCellClick = (therapist, rowIndex) => {
    const totalMinutes = rowIndex * 15;
    const h = Math.floor(totalMinutes / 60) + 9;
    const m = totalMinutes % 60;
    const timeStr = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
    
    setCreateData({
      therapistId: therapist.id,
      therapistName: therapist.name,
      time: timeStr,
      date: currentDate
    });
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      setEditBooking(null);
      setCreateData(null);
    }
  };

  return (
    <div className="relative min-w-max">
      <div
        className="relative"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${finalTherapists.length || 1}, ${columnWidth}px)`,
          gridTemplateRows: `repeat(${rows}, ${rowHeight}px)`,
          width: `${(finalTherapists.length || 1) * columnWidth}px`,
          height: `${rows * rowHeight}px`,
          backgroundColor: "white",
        }}
      >
        {finalTherapists.map((t, colIndex) => (
          <div key={t.id} style={{ display: 'contents' }}>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <div
                key={`${t.id}-${rowIndex}`}
                onClick={() => handleCellClick(t, rowIndex)}
                className="border-r border-b border-gray-100 hover:bg-blue-50/20 cursor-pointer transition-colors"
                style={{ 
                  gridColumn: colIndex + 1,
                  gridRow: rowIndex + 1,
                  width: columnWidth, 
                  height: rowHeight 
                }}
              />
            ))}
          </div>
        ))}

        {allBookings.map((b, idx) => {
          const colIndexRaw = finalTherapists.findIndex((t) => 
            Number(t.id) === Number(b.therapistId) || 
            (t.name && b.therapistName && t.name.toLowerCase() === b.therapistName.toLowerCase())
          );
          const colIndex = colIndexRaw === -1 ? 0 : colIndexRaw;

          return (
            <div
              key={b.id || idx}
            onClick={() => setEditBooking(b)}
              className="absolute p-0.5 cursor-pointer"
              style={{
                top: `${getTop(b.start)}px`,
                left: `${(colIndex * columnWidth) + (columnWidth * (b.offsetFactor || 0))}px`,
                width: `${columnWidth * (b.widthFactor || 1)}px`,
                height: `${getHeight(b.duration)}px`,
                zIndex: 1000 + idx,
              }}
            >
              <div className="h-full w-full">
                <BookingCard 
                  booking={b} 
                  onClick={() => setEditBooking(b)} 
                />
              </div>
            </div>
          );
        })}
      </div>

      {(editBooking || createData) && (
        <div 
          className="fixed inset-0 z-[5010] cursor-default" 
          onClick={() => { setEditBooking(null); setCreateData(null); }}
        />
      )}

      {editBooking && (
        <EditBookingPanel
          booking={editBooking}
          onClose={() => setEditBooking(null)}
          onSave={(updated) => {
            console.log("Saving booking:", updated);
            setEditBooking(null);
          }}
        />
      )}

      {createData && (
        <CreateBookingPanel
          createData={createData}
          onClose={() => setCreateData(null)}
          onCreate={() => setCreateData(null)}
        />
      )}
    </div>
  );
};

export default CalendarGrid;
