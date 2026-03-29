import { useState } from "react";
import { therapists } from "../../data/therapists";
import { clients } from "../../data/clients";

const CreateBookingPanel = ({ createData, onClose }) => {
  const [form, setForm] = useState({
    service: "",
    client: "",
    phone: "",
    therapistId: createData?.therapistId || "",
    duration: 60,
    start: createData?.start || "09:30",
  });
  const [isMember, setIsMember] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredClients, setFilteredClients] = useState(clients);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (value) => {
    setSearch(value);
    setShowDropdown(true);

    const result = clients.filter(
      (c) =>
        c.name.toLowerCase().includes(value.toLowerCase()) ||
        c.phone.includes(value),
    );

    setFilteredClients(result);
  };

  return (
    <div
      className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-xl z-50 flex flex-col border-l"
      onClick={(e) => e.stopPropagation()}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center px-5 py-3 border-b">
        <h2 className="text-[15px] font-semibold">New Booking</h2>
        <button
          onClick={onClose}
          className="text-[13px] px-3 py-1 border rounded-md text-[#EA580C]"
        >
          Cancel
        </button>
      </div>

      {/* BODY */}
      <div className="p-5 text-[13px] flex flex-col gap-5 overflow-y-auto">
        {/* OUTLET */}
        <div>
          <p className="text-gray-400 text-[12px]">Outlet</p>
          <p className="font-medium">Liat Towers</p>
        </div>

        {/* DATE TIME */}
        <div className="grid grid-cols-2 border rounded-md overflow-hidden">
          <div className="p-3 border-r">
            <p className="text-gray-400 text-[11px]">On</p>
            <p className="font-medium">Tue, Aug 8</p>
          </div>
          <div className="p-3">
            <p className="text-gray-400 text-[11px]">At</p>
            <p className="font-medium">09:30 PM</p>
          </div>
        </div>

        {/* SEARCH CLIENT */}
        <div className="relative">
          <input
            placeholder="Search or create client"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            className="w-full border-b pb-2 outline-none text-[13px]"
          />

          {showDropdown && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-md mt-1 max-h-[220px] overflow-y-auto z-50">
              {filteredClients.map((c) => (
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
                      service: "60 Mins Body Therapy",
                    });
                  }}
                  className="px-3 py-2 cursor-pointer hover:bg-[#F3F4F6]"
                >
                  <p className="font-medium">{c.name}</p>
                  <p className="text-gray-400 text-[12px]">{c.phone}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AFTER CLIENT SELECTED */}
        {selectedClient && (
          <>
            {/* CLIENT CARD */}
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-orange-400 text-white flex items-center justify-center font-semibold">
                  {selectedClient.name[0]}
                </div>

                <div>
                  <p className="font-medium">{selectedClient.name}</p>
                  <p className="text-gray-400 text-[12px]">
                    {selectedClient.phone}
                  </p>
                  <p className="text-gray-400 text-[11px]">
                    Client since December 2023
                  </p>
                </div>
              </div>

              <span className="text-gray-400 cursor-pointer">🗑</span>
            </div>

            <div className="flex justify-between text-[12px] text-gray-500">
              <span>Apply membership discount:</span>

              <div
                onClick={() => setIsMember(!isMember)}
                className={`w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition ${
                  isMember ? "bg-orange-400" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-3 h-3 bg-white rounded-full shadow-md transform transition ${
                    isMember ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </div>
            </div>

            <div className="border rounded-md p-3 space-y-2">
              <p className="font-medium">{form.service}</p>

              <div className="flex justify-between text-[12px] text-gray-500">
                <span>
                  With:{" "}
                  <select
                    value={form.therapistId}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        therapistId: +e.target.value,
                      })
                    }
                  >
                    {therapists.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </span>

                <span className="flex items-center gap-1">
                  <input type="checkbox" defaultChecked />
                  Requested Therapist
                </span>
              </div>

              <div className="flex justify-between text-[12px] text-gray-500">
                <span>For: {form.duration} min</span>
                <span>At: 09:30 AM</span>
              </div>

              <div className="text-[12px] text-gray-500">
                Using: 806 Couples Room
              </div>

              <div className="text-[12px] text-gray-400">
                Select request(s) Soft, China
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between text-gray-500">
              <span className="cursor-pointer">+ Add service</span>
              <span className="cursor-pointer">+ Add pax</span>
            </div>

            <div className="border-b pb-2 text-gray-400">Select Source</div>

            <textarea
              placeholder="Notes (Optional)"
              className="w-full border-b outline-none resize-none"
            />
          </>
        )}
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t">
        <button
          onClick={() => {
            console.log("CREATE BOOKING:", form);
            onClose();
          }}
          className="w-full bg-[#3C2212] text-white py-2 rounded-md"
        >
          Create Booking
        </button>
      </div>
    </div>
  );
};

export default CreateBookingPanel;
