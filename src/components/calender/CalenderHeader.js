import { useEffect, useRef, useState } from "react";
import FilterIcon from "../common/icons/FilterIcon";
import DropdownIcon from "../common/icons/DropDownIcon";
import SearchIcon from "../common/icons/SearchIcon";
import CalendarIcon from "../common/icons/CalenderIcon";
import { customers } from "../../data/customers";
import FilterModal from "./FilterModal";

const CalendarHeader = () => {
  const [showFilter, setShowFilter] = useState(false);

  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const wrapperRef = useRef();

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search),
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-[#F3F4F6] border-b border-gray-200 px-4 sm:px-6 py-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col leading-[1.1]">
          <div className="flex items-center gap-1 text-[14px] font-semibold text-[#374151]">
            <span>Liat Towers</span>
            <DropdownIcon className="w-3 h-3 text-gray-500" />
          </div>

          <div className="flex items-center gap-1 text-[12px] text-gray-500 mt-[2px]">
            <span>Display : 15 Min</span>
            <DropdownIcon className="w-2.5 h-2.5 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          {/* 🔥 SEARCH + FILTER */}
          <div className="flex items-center gap-2 w-full sm:flex-1 lg:w-auto">
            {/* SEARCH WRAPPER */}
            <div ref={wrapperRef} className="relative flex-1 lg:w-[300px]">
              <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 h-[36px]">
                <SearchIcon />

                <input
                  value={search}
                  onFocus={() => setShowDropdown(true)}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  type="text"
                  placeholder="Search Sales by phone/name"
                  className="w-full ml-2 text-[13px] text-gray-700 placeholder-gray-400 outline-none bg-transparent"
                />

                {search && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setShowDropdown(false);
                    }}
                    className="text-gray-400 text-sm ml-2"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* 🔽 DROPDOWN */}
              {showDropdown && (
                <div className="absolute top-[40px] left-0 w-full bg-white border border-gray-200 rounded-md shadow-xl z-50 max-h-[250px] overflow-y-auto">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((c, i) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          setSearch(c.name);
                          setShowDropdown(false);
                          console.log("Selected:", c);
                        }}
                        onMouseEnter={() => setActiveIndex(i)}
                        className={`px-3 py-2 cursor-pointer transition ${
                          activeIndex === i
                            ? "bg-[#3C2212] text-white"
                            : "text-[#111827]"
                        }`}
                      >
                        <p className="text-[13px] font-medium">{c.name}</p>
                        <p
                          className={`text-[11px] ${
                            activeIndex === i
                              ? "text-white/80"
                              : "text-gray-400"
                          }`}
                        >
                          {c.phone}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-gray-400 text-[13px]">
                      No results
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* FILTER */}
            <div className="relative">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="
                  flex items-center justify-center gap-2 
                  bg-white border border-gray-300 
                  rounded-md px-3 sm:px-4 
                  h-[36px] text-[13px] 
                  text-[#3C2212] font-medium 
                  whitespace-nowrap
                "
              >
                <span className="hidden xs:inline sm:inline">Filter</span>
                <FilterIcon />
              </button>

              <FilterModal
                isOpen={showFilter}
                onClose={() => setShowFilter(false)}
              />
            </div>
          </div>

          {/* DATE */}
          <div
            className="
              flex items-center justify-center gap-2 sm:gap-3 
              bg-[#E5E7EB] rounded-md 
              px-3 sm:px-4 h-[36px] 
              text-[13px] text-[#111827] 
              whitespace-nowrap
              w-full sm:w-auto
            "
          >
            <span className="font-medium">Today</span>
            <span className="cursor-pointer text-gray-500">‹</span>
            <span className="font-medium">Sat, Aug 16</span>
            <span className="cursor-pointer text-gray-500">›</span>
            <span className="hidden sm:inline text-gray-400">|</span>
            <CalendarIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;
