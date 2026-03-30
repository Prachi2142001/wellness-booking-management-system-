import { useState, useRef, useEffect } from "react";
import { useData } from "../../context/DataContext";
import DeleteIcon from "../common/icons/DeleteIcon";
import DropdownIcon from "../common/icons/DropDownIcon";
import StarIcon from "../common/icons/StarIcon";
import InfoIcon from "../common/icons/InfoIcon";
import { createBooking } from "../../utils/api";

const CreateBookingPanel = ({ createData, onClose }) => {
  const { therapists, users } = useData();
  const [form, setForm] = useState({
    service: "60 Mins Body Therapy",
    client: "",
    phone: "",
    therapistId: createData?.therapistId || 1,
    duration: 60,
    start: createData?.time || "09:30 AM",
  });

  const [isMember, setIsMember] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const ref = useRef();

  useEffect(() => {
    if (users && users.length > 0) {
      setFilteredClients(users);
    }
  }, [users]);

  const handleSearch = (value) => {
    setSearch(value);
    setShowDropdown(true);

    const result = users.filter(
      (c) =>
        (c.name && c.name.toLowerCase().includes(value.toLowerCase())) ||
        (c.contact_number && c.contact_number.includes(value)),
    );

    setFilteredClients(result);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateBooking = async () => {
    try {
      const response = await createBooking(form);
      console.log("Booking created successfully:", response);
      onClose(); 
    } catch (error) {
      console.error("Failed to create booking:", error);
    }
  };

  return (
    <div
      className="fixed top-0 right-0 h-full w-[360px] sm:w-[420px] bg-[#fafafa] shadow-xl z-50 flex flex-col border-l"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center px-5 py-3 border-b border-gray-100 bg-[#fafafa]">
        <h2 className="text-[14px] font-semibold text-[#111827]">
          New Booking
        </h2>
        <button
          onClick={onClose}
          className="text-[13px] text-orange-500 border border-orange-200 px-4 py-1 rounded bg-white hover:bg-orange-50 transition-colors font-medium"
        >
          Cancel
        </button>
      </div>

      <div className="flex-1 text-[13px] bg-[#fafafa] overflow-y-auto w-full">
        <div className="px-5 py-4 border-b border-gray-100 bg-white">
          <div className="flex items-center text-[13px]">
            <span className="text-gray-400 w-12 italic">Outlet</span>
            <span className="font-semibold text-[#111827]">Liat Towers</span>
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-gray-100 bg-white">
          <div className="px-5 py-4 border-r border-gray-100 flex items-center">
            <span className="text-gray-400 text-[13px] italic mr-3">On</span>
            <span className="font-semibold text-[#111827]">{createData?.date || "No Date"}</span>
          </div>
          <div className="px-5 py-4 flex items-center">
            <span className="text-gray-400 text-[13px] italic mr-3">At</span>
            <span className="font-semibold text-[#111827]">{createData?.time || "No Time"}</span>
          </div>
        </div>

        {!selectedClient && (
          <div className="flex-1 bg-white">
            <div
              ref={ref}
              className="relative z-50 bg-white px-5 py-4 border-b border-gray-100"
            >
              <input
                placeholder="Search or create client"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                className="w-full outline-none text-[14px] font-semibold text-[#111827] placeholder-gray-400 bg-transparent border-b border-gray-200 pb-2 focus:border-gray-400 transition-colors"
              />

              {showDropdown && (
                <div className="absolute top-[100%] left-0 w-full bg-white shadow-xl rounded-md mt-1 max-h-[300px] overflow-y-auto z-[9999] border border-gray-100">
                  {filteredClients.length > 0 ? (
                    filteredClients.map((c, i) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          setSelectedClient(c);
                          setSearch(c.name);
                          setShowDropdown(false);
                          setForm({
                            ...form,
                            client: c.name,
                            phone: c.phone,
                          });
                        }}
                        className={`px-5 py-3.5 cursor-pointer border-b border-gray-50 last:border-none transition-colors ${
                          i === 0
                            ? "bg-[#3C2212] text-white"
                            : "hover:bg-gray-50 bg-white text-[#111827]"
                        }`}
                      >
                        <p className="text-[14px] font-bold text-[#111827]">{c.name}</p>
                        <p
                          className={`text-[12px] font-medium mt-0.5 ${
                            i === 0 ? "text-white/80" : "text-gray-400"
                          }`}
                        >
                          {c.contact_number || c.phone || c.mobile_number}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="px-5 py-3.5 text-gray-400 text-[13px] bg-white font-medium">
                      No results
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {selectedClient && (
          <>
            <div className="px-5 py-5 border-b border-gray-100 bg-white flex flex-col gap-4">
              <div className="flex gap-4 items-start w-full">
                <div className="relative mt-1 shrink-0">
                  <div className="w-[42px] h-[42px] rounded-full bg-[#E59850] flex items-center justify-center text-white font-medium text-[16px]">
                    {selectedClient.name?.[0]?.toUpperCase() || "V"}
                    {selectedClient.name?.split(" ")[1]?.[0]?.toUpperCase() ||
                      "B"}
                  </div>
                  <div className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-[#EBA741] rounded-full flex items-center justify-center border-2 border-white">
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 16 16"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.5 11.5H13.5V13H2.5V11.5ZM2.5 4.5L5 7.5L8 3L11 7.5L13.5 4.5V10H2.5V4.5Z" />
                    </svg>
                  </div>
                </div>

                <div className="flex-1 w-full flex flex-col">
                  <div className="flex justify-between items-start w-full">
                    <p className="font-semibold text-[#111827] text-[14px] leading-tight flex-1">
                      {selectedClient.phone}{" "}
                      <span className="text-gray-500 font-medium">
                        ({selectedClient.id && `#${selectedClient.id}`})
                      </span>
                      <br />
                      <span className="inline-block mt-0.5">
                        {selectedClient.name}
                      </span>
                    </p>
                    <span
                      className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-1 -mr-2 -mt-1 shrink-0"
                      onClick={() => {
                        setSelectedClient(null);
                        setSearch("");
                        setForm({ ...form, client: "", phone: "" });
                      }}
                    >
                      <DeleteIcon className="w-4 h-4" />
                    </span>
                  </div>
                  <p className="text-gray-400 text-[12px] mt-2 font-medium italic">
                    Client since December 2023
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
                    {isMember && (
                      <div className="w-[5px] h-[5px] bg-[#EBA741] rounded-full mx-auto mt-[6.5px]"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 py-5 border-b border-gray-100 bg-white space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 flex-1">
                  <span className="font-semibold text-[#111827] text-[14px]">
                    {form.service}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-[13px] items-center text-gray-400 italic">
                <div className="flex items-center gap-2">
                  <span>With:</span>
                  <div className="flex items-center gap-1.5 ml-1 relative">
                    <span className="w-4 h-4 rounded-full bg-[#EC4899] text-white flex items-center justify-center text-[9px] font-medium not-italic shrink-0">
                      12
                    </span>
                    <select
                      value={form.therapistId}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          therapistId: +e.target.value,
                        })
                      }
                      className="text-[#111827] font-semibold not-italic outline-none bg-transparent appearance-none cursor-pointer pr-4 hover:bg-gray-50 px-1 py-0.5 rounded -ml-1 transition-colors"
                    >
                      {therapists.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold not-italic text-[#111827]">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 accent-[#3C2212] rounded-sm cursor-pointer border-gray-300"
                    />
                    <StarIcon className="w-4 h-4" /> Requested Therapist{" "}
                    <InfoIcon className="w-4 h-4 text-[#111827] mx-0.5" />
                  </label>

                  <DeleteIcon className="cursor-pointer ml-1" />
                </div>
              </div>

              <div className="flex text-[13px] items-center text-gray-400 italic gap-8 pt-1">
                <div className="flex items-center gap-2">
                  <span>For:</span>
                  <span className="text-[#111827] font-semibold not-italic">
                    {form.duration} min
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span>At:</span>
                  <span className="text-[#111827] font-semibold not-italic flex items-center gap-1.5">
                    {form.start}{" "}
                    <DropdownIcon className="w-[9px] h-[9px] text-gray-500 ml-0.5" />
                  </span>
                </div>
              </div>

              <div className="text-[13px] text-gray-400 italic pt-2">
                Using:{" "}
                <span className="text-[#111827] font-semibold not-italic ml-1">
                  806 Couples Room
                </span>
              </div>

              <div className="text-[13px] text-gray-400 italic pt-1 mb-2">
                Select request(s):{" "}
                <span className="text-[#111827] font-semibold not-italic ml-1">
                  Soft, China
                </span>
              </div>
            </div>

            <div className="px-5 py-4 border-b border-gray-100 bg-white flex justify-between items-center text-[13px] font-semibold text-gray-500">
              <span className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 transition-colors">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8V16M8 12H16" strokeLinecap="round" />
                </svg>
                Add service
              </span>
              <span className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 transition-colors">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8V16M8 12H16" strokeLinecap="round" />
                </svg>
                Add pax
              </span>
            </div>

            <div className="px-5 py-5 bg-white">
              <div className="flex justify-between items-center text-[13px] font-medium text-gray-400 border-b border-gray-200 pb-2 cursor-pointer mb-6 hover:text-gray-600 transition-colors">
                <span>Select Source</span>
                <DropdownIcon className="w-[10px] h-[10px] text-gray-400" />
              </div>

              <div className="border-b border-gray-200 pb-2">
                <textarea
                  placeholder="Notes (Optional)"
                  className="w-full text-[13px] font-semibold text-[#111827] placeholder-gray-400 outline-none resize-none bg-transparent leading-relaxed"
                  rows={2}
                />
              </div>
            </div>

            <div className="bg-white pb-20"></div>
          </>
        )}
      </div>
      <button
        onClick={handleCreateBooking}
        className="w-full bg-[#3e2723] hover:bg-[#2d1c19] text-white py-2 rounded-md text-[14px] font-medium transition-colors"
      >
        Create Booking
      </button>
    </div>
  );
};

export default CreateBookingPanel;
