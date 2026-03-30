import { useState } from "react";
import DeleteIcon from "../common/icons/DeleteIcon";
import DropdownIcon from "../common/icons/DropDownIcon";
import StarIcon from "../common/icons/StarIcon";
import InfoIcon from "../common/icons/InfoIcon";
import EditIcon from "../common/icons/EditIcon";

const EditBookingPanel = ({ booking, onClose, onSave }) => {
  const [form, setForm] = useState({
    ...booking,
    requestedTherapist: booking?.requestedTherapist || false,
  });

  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div 
      className="fixed inset-y-0 right-0 z-[5020] w-[360px] h-full bg-white shadow-xl border-l flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-[14px] font-semibold">Update Booking</h2>
        <button
          onClick={() => { if (onClose) onClose(booking, 'showCancelPanel'); }}
          className="text-[13px] text-orange-500 border border-orange-200 px-3 py-1 rounded-md"
        >
          Cancel
        </button>
      </div>

      <div className="flex-1 overflow-y-auto text-[13px]">
        <div className="px-4 py-3 border-b">
          <p className="text-gray-400 text-[12px] italic">Outlet <span className="font-medium text-[#111827] not-italic ml-2">Liat Towers</span></p>
        </div>

        <div className="grid grid-cols-2 border-b">
          <div className="px-4 py-3 border-r">
            <p className="text-gray-400 text-[12px] italic">On <span className="font-medium text-[#111827] not-italic ml-2">Tue, Aug 8</span></p>
          </div>
          <div className="px-4 py-3">
            <p className="text-gray-400 text-[12px] italic">At <span className="font-medium text-[#111827] not-italic ml-2">09:30 PM</span></p>
          </div>
        </div>

        <div className="px-4 py-4 border-b flex gap-3 items-start">
          <div className="relative">
             <div className="w-10 h-10 rounded-full bg-[#E59850] flex items-center justify-center text-white font-semibold">
               {form.client?.[0] || "C"}
             </div>
             <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#EBA741] rounded-full flex items-center justify-center border-2 border-white">
               <svg width="8" height="8" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                 <path d="M2.5 11.5H13.5V13H2.5V11.5ZM2.5 4.5L5 7.5L8 3L11 7.5L13.5 4.5V10H2.5V4.5Z" />
               </svg>
             </div>
          </div>

          <div className="flex-1">
            <input
              value={form.client || ""}
              onChange={(e) => setForm({ ...form, client: e.target.value })}
              className="font-semibold text-[#111827] w-full outline-none bg-transparent"
              placeholder="Client Name"
            />
            <p className="text-[11px] text-gray-400 mt-1">
              Client since December 2023
            </p>
            <div className="flex items-center text-[12px] text-gray-400 mt-2 italic">
              <span className="mr-1">Phone:</span>
              <input
                value={form.phone || ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="text-[#111827] font-medium outline-none bg-transparent w-full not-italic"
                placeholder="Phone Number"
              />
            </div>
          </div>
        </div>

        <div className="px-4 py-4 border-b space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 flex-1">
              <input
                value={form.service || ""}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="font-semibold text-[#111827] text-[14px] outline-none w-[170px] bg-transparent"
                placeholder="Service Name"
              />
              <DropdownIcon className="w-3 h-3 text-gray-400" />
            </div>
            <DeleteIcon className="cursor-pointer text-gray-400" />
          </div>

          <div className="flex justify-between text-[13px] items-center text-gray-400 italic">
            <div className="flex items-center gap-2">
              <span>With:</span>
              <div className="flex items-center gap-1.5 ml-1">
                <span className="w-4 h-4 rounded-full bg-[#EC4899] text-white flex items-center justify-center text-[9px] font-medium not-italic">12</span>
                <span className="text-[#111827] font-semibold not-italic">
                  <input
                    value={form.therapistName || ""}
                    onChange={(e) => setForm({ ...form, therapistName: e.target.value })}
                    className="w-16 outline-none bg-transparent"
                    placeholder="Therapist"
                  />
                </span>
              </div>
            </div>

            <label className="flex items-center gap-1 cursor-pointer font-semibold not-italic text-[#111827]">
              <input
                type="checkbox"
                checked={form.requestedTherapist}
                onChange={(e) =>
                  setForm({
                    ...form,
                    requestedTherapist: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-[#3C2212] rounded-sm cursor-pointer border-gray-300 mr-0.5"
              />
              <StarIcon className="w-4 h-4" /> Requested Therapist <InfoIcon className="w-4 h-4 text-[#111827]" />
            </label>
          </div>

          <div className="flex justify-between text-[13px] items-center text-gray-400 italic">
            <div className="flex items-center gap-1">
              <span>For:</span>
              <div className="flex items-center ml-1">
                <input
                  type="number"
                  value={form.duration || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      duration: e.target.value ? Number(e.target.value) : "",
                    })
                  }
                  className="w-8 outline-none bg-transparent text-[#111827] font-semibold not-italic"
                />
                <span className="text-[#111827] font-semibold not-italic">min</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span>At:</span>
              <div className="flex items-center gap-1 bg-white ml-1">
                <input
                  value={form.start || ""}
                  onChange={(e) => setForm({ ...form, start: e.target.value })}
                  className="text-[#111827] font-semibold not-italic w-[60px] outline-none bg-transparent"
                  placeholder="Time"
                />
                <DropdownIcon className="w-3 h-3 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="text-[13px] text-gray-400 italic pt-1 flex items-center">
            Adjusted Commission (S$){" "}
            <span className="text-[#111827] font-semibold not-italic border-b border-gray-300 pb-0.5 ml-2">$52.00</span>
          </div>

          <div className="text-[13px] text-gray-500 font-medium flex items-center gap-1.5 cursor-pointer pt-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
               <circle cx="12" cy="12" r="10" />
               <path d="M12 8V16M8 12H16" strokeLinecap="round" />
            </svg>
            Add therapist (split commission)
          </div>

          <div className="text-[13px] text-gray-400 italic flex items-center gap-1.5 pt-1">
            Using: <span className="text-[#111827] font-semibold not-italic ml-1">806 Couples Room</span> <EditIcon className="w-3.5 h-3.5 text-black cursor-pointer ml-1" />
          </div>

          <div className="text-[13px] text-gray-400 italic pt-1 mb-2">
            Select request(s):{" "}
            <span className="text-[#111827] font-semibold not-italic ml-1">Soft, China</span>
          </div>
        </div>

        <div className="px-4 py-4 border-b flex items-center gap-1.5 text-[13px] font-medium text-gray-500 cursor-pointer">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
             <circle cx="12" cy="12" r="10" />
             <path d="M12 8V16M8 12H16" strokeLinecap="round" />
          </svg>
          Add service
        </div>

        <div className="px-4 py-4 border-b flex justify-between items-center text-[13px] font-semibold text-[#111827] cursor-pointer">
          <span>By Phone</span>
          <DropdownIcon className="w-3 h-3 text-gray-500" />
        </div>

        <div className="px-4 py-4 mb-10">
          <textarea
            value={form.notes || ""}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full text-[13px] text-[#111827] font-medium outline-none resize-none bg-transparent leading-relaxed"
            rows={4}
            placeholder="Notes"
          />
        </div>
      </div>

      <div className="p-4 border-t">
        <button
          disabled={isProcessing}
          onClick={() => {
            onSave(form);
            if (onClose) onClose();
          }}
          className="w-full bg-[#3e2723] hover:bg-[#2d1c19] text-white py-2 rounded-md text-[14px] font-medium transition-colors disabled:opacity-50"
        >
          {isProcessing ? "Processing..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditBookingPanel;
