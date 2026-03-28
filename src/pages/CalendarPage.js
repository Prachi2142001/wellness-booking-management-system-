import CalendarGrid from "../components/calender/CalendarGrid";
import CalendarHeader from "../components/calender/CalenderHeader";
import TherapistRow from "../components/calender/TherapistRow";
import TimeColumn from "../components/calender/TimeColumn";
import Navbar from "../components/layout/Navbar";

const CalendarPage = () => {
  return (
    <div className="h-screen flex flex-col bg-[#f5f5f5]">
      <Navbar />
      <CalendarHeader />
      <TherapistRow />
      <div className="flex flex-1 overflow-auto">
        <TimeColumn />
        <CalendarGrid />
      </div>
    </div>
  );
};

export default CalendarPage;
