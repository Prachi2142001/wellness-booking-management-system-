import CircleCIcon from "../common/icons/CircleIcon";
import CircleSIcon from "../common/icons/CircleSIcon";
import GlobeIcon from "../common/icons/GlobeIcon";
import NotesIcon from "../common/icons/NotesIcon";
import DeviceIcon from "../common/icons/POSIcon";
import StarIcon from "../common/icons/StarIcon";

const BookingCard = ({ booking }) => {
  const statusStyles = {
    confirmed: "bg-[#A7D3E8]",
    in_progress: "bg-[#E7C9CF]",
    cancelled: "bg-[#D1D5DB]",
  };

  return (
    <div
      className={`absolute left-1 right-1 rounded-md p-2 text-[11px] ${statusStyles[booking.status]}`}
    >
      <div className="leading-tight">{booking.service}</div>

      <div className="text-[11px] font-semibold mt-1">{booking.phone}</div>

      <div className="text-[11px] font-semibold">{booking.client}</div>

      <div className="flex items-center gap-1 mt-2">
        {booking.tags?.includes("C") && <CircleCIcon />}
        {booking.tags?.includes("star") && <StarIcon />}
        {booking.tags?.includes("S") && <CircleSIcon />}
        {booking.tags?.includes("globe") && <GlobeIcon />}
        {booking.tags?.includes("notes") && <NotesIcon />}
        {booking.tags?.includes("device") && <DeviceIcon />}
      </div>
    </div>
  );
};

export default BookingCard;