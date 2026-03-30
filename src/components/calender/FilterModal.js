import { useEffect, useRef } from "react";
import { useFilters } from "../../context/FilterContext";
import { useData } from "../../context/DataContext";

const FilterModal = ({ isOpen, onClose }) => {
  const modalRef = useRef();
  const { filters, setFilters } = useFilters();
  const { therapists } = useData();

  const statusMap = {
    Confirmed: "confirmed",
    Unconfirmed: "unconfirmed",
    "Checked In": "checked_in",
    Completed: "completed",
    Cancelled: "cancelled",
    "No Show": "no_show",
    Holding: "holding",
    "In Progress": "in_progress",
  };

  const toggleStatus = (status) => {
    setFilters((prev) => {
      const exists = prev.status.includes(status);

      return {
        ...prev,
        status: exists
          ? prev.status.filter((s) => s !== status)
          : [...prev.status, status],
      };
    });
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      therapists: [],
      search: "",
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="
        absolute right-0 z-50
        w-[340px] sm:w-[320px]
        bg-white rounded-[10px]
        shadow-[0px_10px_40px_rgba(0,0,0,0.1)]
        border border-gray-100 flex flex-col overflow-hidden
      "
    >
      <div className="max-h-[500px] overflow-y-auto pt-6 pb-6 custom-scroll">
        <div className="px-5">
          <p className="text-[13px] font-bold text-[#111827] mb-3 leading-none">
            Show by group <span className="font-semibold text-[#374151]">(Person who is on duty)</span>
          </p>

          <div className="space-y-3.5 text-[13px] font-medium pt-2">
            <div className="flex justify-between items-center cursor-pointer group">
              <span className="text-[#9CA3AF] group-hover:text-gray-900 transition-colors">All Therapist</span>
              <div className="w-[11px] h-[11px] bg-[#3C2212] rounded-full"></div>
            </div>
            <div className="text-[#9CA3AF] cursor-pointer hover:text-gray-900 transition-colors">Male</div>
            <div className="text-[#9CA3AF] cursor-pointer hover:text-gray-900 transition-colors">Female</div>
          </div>
        </div>

        <div className="border-t border-gray-100 mx-5 my-5"></div>

        <div className="px-5">
          <p className="text-[13px] font-bold text-[#111827] mb-3 leading-none">
            Resources
          </p>

          <div className="space-y-3.5 text-[13px] font-medium pt-2">
            <div className="text-[#9CA3AF] cursor-pointer hover:text-gray-900 transition-colors">Rooms</div>
            <div className="text-[#9CA3AF] cursor-pointer hover:text-gray-900 transition-colors">Sofa</div>
            <div className="text-[#9CA3AF] cursor-pointer hover:text-gray-900 transition-colors">Monkey Chair</div>
          </div>
        </div>

        <div className="border-t border-gray-100 mx-5 my-5"></div>

        <div className="px-5">
          <p className="text-[13px] font-bold text-[#111827] mb-4 leading-none">
            Booking Status
          </p>

          <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[13px] text-[#374151] font-medium">
            {[
              ["Confirmed", "#7DD3FC"],
              ["Unconfirmed", "#E5E5E5"],
              ["Checked In", "#F9A8D4"],
              ["Completed", "#7DD3FC"],
              ["Cancelled", "#7DD3FC"],
              ["No Show", "#7DD3FC"],
              ["Holding", "#E5E5E5"],
              ["In Progress", "#F9A8D4"],
            ].map(([label, color]) => {
              const value = statusMap[label];

              return (
                <label key={label} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(value)}
                    onChange={() => toggleStatus(value)}
                    className="w-4 h-4 accent-[#57534E] rounded-sm cursor-pointer border-gray-300 transition-all"
                  />
                  <span className="text-[#4B5563] group-hover:text-[#111827] transition-colors">{label}</span>
                  <span
                    className="w-[7px] h-[7px] rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </label>
              );
            })}
          </div>
        </div>

        <div className="border-t border-gray-100 mx-5 my-5"></div>

        <div className="px-5">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[13px] font-bold text-[#111827]">
              Select Therapist
            </span>

            <label className="flex items-center gap-1 text-[13px] font-bold text-[#111827] cursor-pointer">
              Select All
              <input
                type="checkbox"
                checked={filters.therapists.length === 0}
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    therapists:
                      prev.therapists.length === 0
                        ? therapists.map((t) => t.id)
                        : [],
                  }))
                }
                className="w-4 h-4 accent-[#3C2212] rounded-sm cursor-pointer ml-0.5"
              />
            </label>
          </div>

          <input
            type="text"
            placeholder="Search by therapist"
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                search: e.target.value,
              }))
            }
            className="
              w-full
              border border-gray-200
              rounded-md
              px-3 py-2.5
              text-[13px]
              placeholder-[#9CA3AF]
              font-medium
              outline-none
              transition-colors
              focus:border-[#EBA741]
            "
          />
        </div>
      </div>

      <div
        onClick={clearFilters}
        className="w-full bg-[#FCF6F0] px-5 py-3 cursor-pointer hover:bg-[#F8ECD9] transition-colors mt-auto text-center"
      >
        <span className="text-[13px] text-[#C2410C] font-bold">
          Clear Filter (Return to Default)
        </span>
      </div>
    </div>
  );
};

export default FilterModal;
