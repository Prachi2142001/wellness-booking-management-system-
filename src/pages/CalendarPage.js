import { useRef, useEffect } from "react";
import CalendarGrid from "../components/calender/CalendarGrid";
import CalendarHeader from "../components/calender/CalenderHeader";
import TherapistRow from "../components/calender/TherapistRow";
import TimeColumn from "../components/calender/TimeColumn";
import Navbar from "../components/layout/Navbar";

const CalendarPage = () => {
  const bodyScrollRef = useRef(null);
  const timeScrollRef = useRef(null);

  // Sync vertical scroll between time column and calendar grid
  useEffect(() => {
    const bodyEl = bodyScrollRef.current;
    const timeEl = timeScrollRef.current;
    if (!bodyEl || !timeEl) return;

    const onBodyScroll = () => {
      timeEl.scrollTop = bodyEl.scrollTop;
    };
    bodyEl.addEventListener("scroll", onBodyScroll);
    return () => bodyEl.removeEventListener("scroll", onBodyScroll);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#f5f5f5] overflow-hidden">
      <Navbar />
      <CalendarHeader />

      {/* Calendar body */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: sticky time column ── */}
        <div
          className="flex flex-col flex-shrink-0 bg-white border-r border-gray-200 z-20"
          style={{ width: 80 }}
        >
          {/* Corner "Time" header — same height as TherapistRow */}
          <div
            className="flex-shrink-0 flex items-center justify-center text-[13px] font-bold text-[#3C2212] border-b border-gray-200"
            style={{ height: 72 }}
          >
            Time
          </div>

          {/* Time slots — vertically scrollable, synced to grid via ref */}
          <div
            ref={timeScrollRef}
            className="flex-1 overflow-y-hidden"
          >
            <TimeColumn />
          </div>
        </div>

        {/* ── Right: therapist header (sticky top) + grid ── */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Therapist header row — scrolls horizontally with grid below */}
          <div className="flex-shrink-0 overflow-x-hidden" id="therapist-header">
            <TherapistRow />
          </div>

          {/* Grid — the ONE scroll element (both axes) */}
          <div
            ref={bodyScrollRef}
            className="flex-1 overflow-auto"
            id="calendar-scroll"
            onScroll={(e) => {
              // Sync horizontal scroll of therapist header
              const header = document.getElementById("therapist-header");
              if (header) header.scrollLeft = e.currentTarget.scrollLeft;
              // Sync vertical scroll of time column
              if (timeScrollRef.current) {
                timeScrollRef.current.scrollTop = e.currentTarget.scrollTop;
              }
            }}
          >
            <CalendarGrid />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;

