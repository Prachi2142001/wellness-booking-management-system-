import { useState, useRef, useEffect } from "react";
import SearchIcon from "../common/icons/SearchIcon";
import { clients } from "../../data/clients";

const ClientSearchDropdown = ({ onSelect }) => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const ref = useRef();

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="w-full">
      {/* INPUT */}
      <div className="flex items-center bg-white shadow-sm rounded-md px-3 py-2 border">
        <SearchIcon />
        <input
          value={search}
          onFocus={() => setShow(true)}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="ml-2 w-full outline-none text-[13px]"
        />
      </div>

      {/* DROPDOWN */}
      {show && (
        <div className="mt-2 bg-white rounded-md shadow-xl max-h-[220px] overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((c, i) => (
              <div
                key={c.id}
                onClick={() => {
                  setSearch(c.name);
                  setShow(false);
                  onSelect(c);
                }}
                onMouseEnter={() => setActiveIndex(i)}
                className={`
                  px-3 py-2 cursor-pointer transition
                  ${
                    activeIndex === i
                      ? "bg-[#3C2212] text-white"
                      : "text-[#111827]"
                  }
                `}
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
  );
};

export default ClientSearchDropdown;