import CircleCIcon from "../common/icons/CircleIcon";
import CircleSIcon from "../common/icons/CircleSIcon";
import GlobeIcon from "../common/icons/GlobeIcon";
import NotesIcon from "../common/icons/NotesIcon";
import DeviceIcon from "../common/icons/POSIcon";
import StarIcon from "../common/icons/StarIcon";
import TextIcon from "../common/icons/TextIcon";

const BookingCard = ({ booking, onClick }) => {
  const statusStyles = {
    confirmed: "bg-[#B0D9E9]", 
    in_progress: "bg-[#F8DEE4]", 
    completed: "bg-[#D1D5DB]", 
    cancelled: "bg-[#CED4D8]",
    "no-show": "bg-[#D1D5DB]",
  };

  const currentBg = statusStyles[booking.status] || "bg-[#B0D9E9]";

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(booking);
      }}
      className={`booking-card absolute inset-0 rounded-[4px] p-[6px] text-[10px] cursor-pointer shadow-sm border-l-4 border-black/5 ${currentBg} flex flex-col justify-between`}
    >
      <div>
        <div className="text-[#6B7280] leading-tight line-clamp-1 text-[10px] font-medium uppercase tracking-tight">
          {booking.duration} Min {booking.service}
        </div>

        <div className="flex flex-col mt-[2px] leading-tight">
          <div className="text-[#111827] font-bold text-[13px] whitespace-nowrap truncate overflow-hidden">
            {booking.phone}
          </div>
          <div className="text-[#111827] text-[12px] font-medium truncate">
            {booking.client}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[2px] mt-1 flex-wrap">
        {booking.status === 'in_progress' && <TextIcon />}
        <CircleCIcon />
        <StarIcon />
        <CircleSIcon />
        <GlobeIcon />
        <NotesIcon />
        <DeviceIcon />
      </div>
    </div>
  );
};

export default BookingCard;
