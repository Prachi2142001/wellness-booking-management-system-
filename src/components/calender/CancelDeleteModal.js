import { useState } from "react";

const CancelDeleteModal = ({ onClose, onConfirm }) => {
  const [cancellationType, setCancellationType] = useState("normal");

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity"
      onClick={onClose}
    >
      <div 
        className="relative w-[430px] bg-white rounded-[12px] shadow-2xl overflow-hidden flex flex-col p-7"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Progress bar indicator from Figma */}
        <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full mt-1 mb-5 overflow-hidden">
          <div className="h-full bg-[#10B981] w-[45%] rounded-full"></div>
        </div>

        <h2 className="text-[20px] font-bold text-[#111827]">
          Cancel / Delete Booking
        </h2>
        <p className="text-[13px] text-gray-700 font-medium mt-2">
          Please select the cancellation type.
        </p>

        <div className="mt-6 flex flex-col space-y-4">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              value="normal"
              checked={cancellationType === "normal"}
              onChange={() => setCancellationType("normal")}
              className="w-4 h-4 accent-[#EA580C] cursor-pointer"
            />
            <span className={`text-[13px] font-bold transition-colors ${cancellationType === "normal" ? "text-[#111827]" : "text-gray-500 group-hover:text-gray-700"}`}>
              Normal Cancellation
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              value="no_show"
              checked={cancellationType === "no_show"}
              onChange={() => setCancellationType("no_show")}
              className="w-4 h-4 accent-[#EA580C] cursor-pointer"
            />
            <span className={`text-[13px] font-bold transition-colors ${cancellationType === "no_show" ? "text-[#111827]" : "text-[#9CA3AF] group-hover:text-gray-500"}`}>
              No Show
            </span>
          </label>
        </div>

        <div className="border-t border-gray-100 my-5"></div>

        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="radio"
            value="delete"
            checked={cancellationType === "delete"}
            onChange={() => setCancellationType("delete")}
            className="w-4 h-4 accent-[#EA580C] mt-1 cursor-pointer"
          />
          <div className="flex flex-col">
            <span className={`text-[13px] font-bold transition-colors ${cancellationType === "delete" ? "text-[#111827]" : "text-gray-600 group-hover:text-gray-800"}`}>
              Just Delete It
            </span>
            <span className="text-[12px] text-gray-500 mt-1.5 leading-relaxed pr-2 font-medium">
              Bookings with a deposit cannot be deleted. Please cancel instead to retain a proper record.
            </span>
          </div>
        </label>

        <div className="flex justify-between items-center mt-7 gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded text-[13px] font-bold border border-[#EA580C] text-[#EA580C] hover:bg-orange-50 transition-colors focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(cancellationType)}
            className="flex-1 py-2.5 rounded text-[13px] font-bold bg-[#3C2212] text-white hover:bg-[#2d1a0e] transition-colors focus:outline-none"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelDeleteModal;
