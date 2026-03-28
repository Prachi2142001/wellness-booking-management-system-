import FilterIcon from "../common/icons/FilterIcon";
import DropdownIcon from "../common/icons/DropDownIcon";
import SearchIcon from "../common/icons/SearchIcon";
import CalendarIcon from "../common/icons/CalenderIcon";

const CalendarHeader = () => {
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

        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 h-[36px] w-full sm:flex-1 lg:w-[300px]">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search Sales by phone/name"
              className="w-full ml-2 text-[13px] text-gray-700 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>

          <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-md px-3 sm:px-4 h-[36px] text-[13px] text-[#3C2212] font-medium whitespace-nowrap">
            Filter
            <FilterIcon />
          </button>

          <div className="flex items-center justify-center gap-2 sm:gap-3 bg-[#E5E7EB] rounded-md px-3 sm:px-4 h-[36px] text-[13px] text-[#111827] whitespace-nowrap">
            <span className="sm:inline font-medium">Today</span>
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
