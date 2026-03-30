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
      className={`booking-card absolute inset-0 p-[4px] px-[6px] text-[10px] cursor-pointer shadow-sm border-l-2 border-black/10 ${currentBg} flex flex-col justify-between overflow-hidden group hover:ring-2 hover:ring-purple-500 transition-all`}
    >
      <div className="flex flex-col">
        <div className="text-[#374151] leading-[1.2] text-[10px] font-medium mb-1">
          {booking.duration} Min {booking.service}
        </div>

        <div className="flex flex-col leading-[1.2]">
          <div className="text-[#111827] font-bold text-[11px] truncate">
            {booking.phone}
          </div>
          <div className="text-[#111827] font-bold text-[11px] truncate">
            {booking.client}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-[2px] mt-1 flex-wrap">
        {(booking.requested_person === 1 || booking.requested_therapist || booking.requested_person === "1") && (
          <div className="w-3.5 h-3.5 rounded-full bg-black text-white flex items-center justify-center text-[8.5px] font-bold">T</div>
        )}
        {(booking.requested_room === 1 || booking.room_id || booking.requested_room === "1") && (
          <div className="w-3.5 h-3.5 rounded-full bg-[#374151] text-white flex items-center justify-center text-[8.5px] font-bold">R</div>
        )}
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
