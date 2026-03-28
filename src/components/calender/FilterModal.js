import { useEffect, useRef } from "react";
import { useFilters } from "../../context/FilterContext";
import { therapists } from "../../data/therapists";

const FilterModal = ({ isOpen, onClose }) => {
  const modalRef = useRef();
  const { filters, setFilters } = useFilters();

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

  const toggleTherapist = (id) => {
    setFilters((prev) => {
      const exists = prev.therapists.includes(id);

      return {
        ...prev,
        therapists: exists
          ? prev.therapists.filter((t) => t !== id)
          : [...prev.therapists, id],
      };
    });
  };

  const handleSelectAll = () => {
    setFilters((prev) => ({
      ...prev,
      therapists:
        prev.therapists.length === therapists.length
          ? []
          : therapists.map((t) => t.id),
    }));
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
        absolute right-0 top-[52px] z-50
        w-[340px] sm:w-[360px]
        bg-white rounded-xl
        shadow-[0px_10px_30px_rgba(0,0,0,0.12)]
        border border-[#E5E7EB]
      "
    >
      <div className="max-h-[520px] overflow-y-auto px-5 py-4 custom-scroll">
        <p className="text-[13px] font-semibold text-[#111827] mb-3">
          Show by group (Person who is on duty)
        </p>

        <div className="space-y-2 text-[13px] text-[#6B7280]">
          <div className="flex justify-between items-center">
            <span className="text-[#9CA3AF]">All Therapist</span>
            <div className="w-3 h-3 bg-[#3C2212] rounded-full"></div>
          </div>
          <div>Male</div>
          <div>Female</div>
        </div>

        <div className="border-t border-[#E5E7EB] my-4"></div>

        <p className="text-[13px] font-semibold text-[#111827] mb-2">
          Resources
        </p>

        <div className="space-y-2 text-[13px] text-[#6B7280]">
          <div>Rooms</div>
          <div>Sofa</div>
          <div>Monkey Chair</div>
        </div>

        <div className="border-t border-[#E5E7EB] my-4"></div>

        <p className="text-[13px] font-semibold text-[#111827] mb-3">
          Booking Status
        </p>

        <div className="grid grid-cols-2 gap-y-2 text-[13px] text-[#374151]">
          {[
            ["Confirmed", "#9ED2E6"],
            ["Unconfirmed", "#E8D3C4"],
            ["Checked In", "#E7C9CF"],
            ["Completed", "#9ED2E6"],
            ["Cancelled", "#9ED2E6"],
            ["No Show", "#9ED2E6"],
            ["Holding", "#E8D3C4"],
            ["In Progress", "#E7C9CF"],
          ].map(([label, color]) => {
            const value = statusMap[label];

            return (
              <label key={label} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.status.includes(value)}
                  onChange={() => toggleStatus(value)}
                  className="w-4 h-4 accent-[#3C2212] cursor-pointer"
                />
                <span>{label}</span>
                <span
                  className="w-2 h-2 rounded-full ml-1"
                  style={{ backgroundColor: color }}
                />
              </label>
            );
          })}
        </div>

        <div className="border-t border-[#E5E7EB] my-4"></div>

        <div className="flex justify-between items-center mb-2">
          <span className="text-[13px] font-semibold text-[#111827]">
            Select Therapist
          </span>

          <label className="flex items-center gap-1 text-[13px]">
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
              className="w-4 h-4 accent-[#3C2212]"
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
            border border-[#D1D5DB]
            rounded-md
            px-3 py-2
            text-[12px]
            outline-none
            focus:border-[#3C2212]
          "
        />

        <p
          onClick={clearFilters}
          className="mt-4 text-[13px] text-[#EA580C] font-medium cursor-pointer"
        >
          Clear Filter (Return to Default)
        </p>
      </div>
    </div>
  );
};

export default FilterModal;
