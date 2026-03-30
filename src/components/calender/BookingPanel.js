import { useState, useRef, useEffect } from "react";
import EditIcon from "../common/icons/EditIcon";
import DeleteIcon from "../common/icons/DeleteIcon";
import StarIcon from "../common/icons/StarIcon";
import InfoIcon from "../common/icons/InfoIcon";

const BookingPanel = ({ booking, onClose, onEdit, onCancel }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMember, setIsMember] = useState(true);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clientInitial1 = booking?.client?.[0]?.toUpperCase() || "V";
  const clientInitial2 = booking?.client?.split(" ")?.[1]?.[0]?.toUpperCase() || "B";

  // Match the Figma status styles mapping natively
  const getStatusColor = (status) => {
    if (status === 'confirmed') return 'bg-[#7DD3FC]';
    if (status === 'in_progress' || status === 'checked_in') return 'bg-[#F9A8D4]';
    if (status === 'completed') return 'bg-[#D1D5DB]';
    return 'bg-[#7DD3FC]'; // default confirmed
  };

  const getStatusLabel = (status) => {
    if (status === 'confirmed') return 'Confirmed';
    if (status === 'in_progress' || status === 'checked_in') return 'Checked in';
    if (status === 'completed') return 'Completed';
    return 'Confirmed';
  };

  const getStatusActionText = (status) => {
    if (status === 'confirmed') return 'Check-in';
    if (status === 'in_progress' || status === 'checked_in') return 'Checkout';
    return 'View Sale';
  };

  return (
    <div className="fixed right-0 top-0 w-[360px] sm:w-[420px] h-full bg-[#fafafa] shadow-xl border-l flex flex-col z-50">
      <div className="flex justify-between items-center px-5 py-4 border-b border-gray-100 bg-white">
        <h2 className="text-[14px] font-semibold text-[#111827]">Appointment</h2>

        <div className="flex items-center gap-4 relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="text-gray-500 hover:text-gray-800 transition-colors pb-1"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="5" cy="12" r="1.5"></circle>
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="19" cy="12" r="1.5"></circle>
            </svg>
          </button>
          
          {showMenu && (
            <div 
              ref={menuRef}
              className="absolute top-[100%] right-6 mt-1 w-[130px] bg-white shadow-[0px_4px_16px_rgba(0,0,0,0.1)] rounded-md py-2.5 z-50 border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => {
                setShowMenu(false);
                if (onCancel) onCancel(booking);
              }}
            >
              <span className="text-[12px] text-gray-500 font-medium px-4">Cancel / Delete</span>
            </div>
          )}

          <EditIcon 
            className="w-4 h-4 text-[#111827] cursor-pointer hover:text-orange-500 transition-colors"
            onClick={() => {
               if (onEdit) onEdit(booking);
            }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto text-[13px] w-full bg-[#fafafa]">
        <div className="px-5 py-4 border-b border-gray-100 bg-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`w-[10px] h-[10px] rounded-full ${getStatusColor(booking?.status)}`}></div>
            <span className="text-[13px] font-semibold text-[#111827]">{getStatusLabel(booking?.status)}</span>
          </div>
          <button className="bg-[#3C2212] hover:bg-[#2d1c19] text-white text-[12px] font-semibold px-4 py-1.5 rounded transition-colors">
            {getStatusActionText(booking?.status)}
          </button>
        </div>

        <div className="grid grid-cols-2 border-b border-gray-100 bg-white">
          <div className="px-5 py-4 border-r border-gray-100 flex items-center">
            <span className="text-gray-400 text-[13px] italic mr-3">On</span>
            <span className="font-semibold text-[#111827]">Tue, Aug 8</span>
          </div>
          <div className="px-5 py-4 flex items-center">
            <span className="text-gray-400 text-[13px] italic mr-3">At</span>
            <span className="font-semibold text-[#111827]">12:30 PM</span>
          </div>
        </div>

        <div className="px-5 py-5 border-b border-gray-100 bg-white flex flex-col gap-4">
          <div className="flex gap-4 items-start w-full">
            <div className="relative mt-1 shrink-0">
               <div className="w-[42px] h-[42px] rounded-full bg-[#E59850] flex items-center justify-center text-white font-medium text-[16px]">
                 {clientInitial1}{clientInitial2}
               </div>
               <div className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#EBA741] rounded-full flex items-center justify-center border-2 border-white">
                 <svg width="8" height="8" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                   <path d="M2.5 11.5H13.5V13H2.5V11.5ZM2.5 4.5L5 7.5L8 3L11 7.5L13.5 4.5V10H2.5V4.5Z" />
                 </svg>
               </div>
            </div>

            <div className="flex-1 w-full flex flex-col">
              <p className="font-semibold text-[#111827] text-[14px] leading-tight flex-1">
                {booking?.phone || "92214868"} <span className="text-[#111827]">{booking?.client || "Victoria Baker"}</span>
              </p>
              <p className="text-gray-400 text-[12px] mt-1.5 font-medium italic">
                Client since December 2023
              </p>
              <p className="text-gray-400 text-[12px] mt-1.5 font-medium italic">
                Phone: <span className="text-[#111827] font-semibold not-italic">{booking?.phone || "92214868"}</span>
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center text-[13px] text-gray-400 italic pt-2">
            <span>Apply membership discount:</span>
            <div
              onClick={() => setIsMember(!isMember)}
              className={`w-9 h-[22px] flex items-center rounded-full p-[2px] cursor-pointer transition-colors duration-200 ${
                isMember ? "bg-[#EBA741]" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-[18px] h-[18px] bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                  isMember ? "translate-x-4" : "translate-x-0"
                }`}
              >
                 {isMember && <div className="w-[5px] h-[5px] bg-[#EBA741] rounded-full mx-auto mt-[6.5px]"></div>}
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-5 border-b border-gray-100 bg-white space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-[#111827] text-[14px]">
              {booking?.service || "120 Mins Body Therapy"}
            </span>
          </div>

          <div className="flex justify-between text-[13px] items-center text-gray-400 italic mt-2">
            <div className="flex items-center gap-2">
              <span>With:</span>
              <div className="flex items-center gap-1.5 ml-1 relative">
                <span className="w-4 h-4 rounded-full bg-[#EC4899] text-white flex items-center justify-center text-[9px] font-medium not-italic shrink-0">12</span>
                <span className="text-[#111827] font-semibold not-italic">
                  {booking?.therapistName || "Lily"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 cursor-pointer font-semibold not-italic text-[#111827]">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-[#3C2212] rounded-sm cursor-pointer border-gray-300"
                />
                <StarIcon className="w-4 h-4" /> Requested Therapist <InfoIcon className="w-4 h-4 text-[#111827] mx-0.5" />
              </label>
              <DeleteIcon className="cursor-pointer ml-1 text-gray-400 hover:text-red-500 transition-colors" />
            </div>
          </div>

          <div className="flex justify-between text-[13px] items-center text-gray-400 italic pt-1">
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-2">
                 <span>For:</span>
                 <span className="text-[#111827] font-semibold not-italic">{booking?.duration || "120"} min</span>
               </div>
               
               <div className="flex items-center gap-2">
                 <span>At:</span>
                 <span className="text-[#111827] font-semibold not-italic">
                   {booking?.start || "09:30 AM"}
                 </span>
               </div>
            </div>

            <div className="flex items-center gap-2">
               <span>Commission:</span>
               <span className="text-[#111827] font-semibold not-italic">Select</span>
            </div>
          </div>

          <div className="text-[13px] text-gray-400 italic pt-2">
            Using: <span className="text-[#111827] font-semibold not-italic ml-1">806 Couples Room</span>
          </div>

          <div className="text-[13px] text-gray-400 italic pt-1 mb-2">
            Select request(s): <span className="text-[#111827] font-semibold not-italic ml-1">Soft, China</span>
          </div>
        </div>

        <div className="px-5 py-5 border-b border-gray-100 bg-white">
          <div className="bg-[#FEF3C7] text-[#111827] font-medium text-[12px] p-4 rounded-md leading-relaxed">
            I have an allergy to eucalyptus, lavender, and citrus oils. Please avoid using them in my body massage.
          </div>
        </div>

        <div className="px-5 py-6 bg-white text-[13px] pb-6">
          <h3 className="font-semibold text-[#111827] text-[14px] mb-4">Booking Details</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-gray-400 italic w-24 shrink-0">Booked on:</span>
              <span className="text-[#111827] font-semibold">Thu, May 22 at 5:34 PM</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-400 italic w-24 shrink-0">Booked by:</span>
              <span className="text-[#111827] font-semibold">Victoria Baker</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-400 italic w-24 shrink-0">Updated on:</span>
              <span className="text-[#111827] font-semibold">Thu, Jun 13 at 5:34 PM</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-400 italic w-24 shrink-0">Updated by:</span>
              <span className="text-[#111827] font-semibold">Sandy (HQ)</span>
            </div>
            <div className="flex items-start">
              <span className="text-gray-400 italic w-24 shrink-0">Source:</span>
              <span className="text-[#111827] font-semibold">Website</span>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-auto p-4 border-t bg-white flex gap-2 w-full z-10 shrink-0">
        <button
          onClick={() => {
            if (onEdit) onEdit(booking);
          }}
          className="w-full bg-[#EC4899] hover:bg-[#db2777] transition-colors text-white font-bold py-2.5 rounded-md text-[13px]"
        >
          Edit
        </button>
      </div>

    </div>
  );
};

export default BookingPanel;
