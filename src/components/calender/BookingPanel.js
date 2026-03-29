import { useState, useEffect } from "react";
import { therapists } from "../../data/therapists";

const BookingPanel = ({ booking, createData, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);

  const isCreate = !booking;

  const [form, setForm] = useState({
    service: "",
    client: "",
    phone: "",
    duration: 60,
    therapistId: createData?.therapistId || "",
    start: createData?.start || "",
    status: "confirmed",
  });

  useEffect(() => {
    if (booking) {
      setForm(booking);
    } else if (createData) {
      setForm((prev) => ({
        ...prev,
        therapistId: createData.therapistId,
        start: createData.start,
      }));
    }
  }, [booking, createData]);

  const handleSave = () => {
    console.log("UPDATED BOOKING:", form);
    setIsEditing(false);
  };

  const handleCreate = () => {
    console.log("CREATED BOOKING:", form);
    onClose();
  };

  const handleCancelBooking = () => {
    console.log("CANCELLED BOOKING:", booking.id);
    setForm({ ...form, status: "cancelled" });
  };

  const getTherapistName = (id) => {
    return therapists.find((t) => t.id === id)?.name || "Unknown";
  };

  return (
    <div className="fixed top-0 right-0 h-full w-[360px] bg-white shadow-xl z-50 flex flex-col border-l border-gray-200">
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="text-[14px] font-semibold">
          {isCreate
            ? "New Booking"
            : isEditing
              ? "Edit Booking"
              : "Booking Details"}
        </h2>

        <button onClick={onClose} className="text-gray-500 text-lg">
          ✕
        </button>
      </div>

      <div className="p-4 text-[13px] space-y-4 overflow-y-auto">
        {isCreate && (
          <>
            <div>
              <p className="text-gray-500 text-[12px] mb-1">Client</p>
              <input
                placeholder="Search or create client"
                className="w-full border rounded px-2 py-2"
                value={form.client}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
              />
            </div>

            <div>
              <p className="text-gray-500 text-[12px] mb-1">Phone</p>
              <input
                placeholder="Phone number"
                className="w-full border rounded px-2 py-2"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div>
              <p className="text-gray-500 text-[12px] mb-1">Service</p>
              <input
                placeholder="Service name"
                className="w-full border rounded px-2 py-2"
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
              />
            </div>

            <div>
              <p className="text-gray-500 text-[12px] mb-1">Therapist</p>
              <select
                className="w-full border rounded px-2 py-2"
                value={form.therapistId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    therapistId: Number(e.target.value),
                  })
                }
              >
                {therapists.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-gray-500 text-[12px] mb-1">Duration</p>
              <input
                type="number"
                className="w-full border rounded px-2 py-2"
                value={form.duration}
                onChange={(e) =>
                  setForm({ ...form, duration: +e.target.value })
                }
              />
            </div>

            <div>
              <p className="text-gray-500 text-[12px] mb-1">Time</p>
              <p className="font-semibold">{form.start}</p>
            </div>
          </>
        )}

        {!isCreate && (
          <>
            <div>
              <p className="text-gray-500 text-[12px]">Service</p>

              {isEditing ? (
                <input
                  value={form.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                <p className="font-semibold">{form.service}</p>
              )}
            </div>

            <div>
              <p className="text-gray-500 text-[12px]">Client</p>
              <p className="font-semibold">{form.client}</p>
            </div>

            <div>
              <p className="text-gray-500 text-[12px]">Phone</p>
              <p className="font-semibold">{form.phone}</p>
            </div>

            <div>
              <p className="text-gray-500 text-[12px]">Duration</p>

              {isEditing ? (
                <input
                  type="number"
                  value={form.duration}
                  onChange={(e) =>
                    setForm({ ...form, duration: +e.target.value })
                  }
                  className="w-full border rounded px-2 py-1"
                />
              ) : (
                <p className="font-semibold">{form.duration} mins</p>
              )}
            </div>

            <div>
              <p className="text-gray-500 text-[12px]">Therapist</p>

              {isEditing ? (
                <select
                  value={form.therapistId}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      therapistId: +e.target.value,
                    })
                  }
                  className="w-full border rounded px-2 py-1"
                >
                  {therapists.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="font-semibold">
                  {getTherapistName(form.therapistId)}
                </p>
              )}
            </div>

            <div>
              <p className="text-gray-500 text-[12px]">Status</p>
              <p className="font-semibold capitalize">{form.status}</p>
            </div>
          </>
        )}
      </div>

      <div className="mt-auto p-4 border-t flex gap-2">
        {isCreate && (
          <button
            onClick={handleCreate}
            className="w-full bg-[#3C2212] text-white py-2 rounded-md text-[13px]"
          >
            Create Booking
          </button>
        )}

        {!isCreate && !isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-blue-500 text-white py-2 rounded-md text-[13px]"
            >
              Edit
            </button>

            <button
              onClick={handleCancelBooking}
              className="flex-1 bg-red-500 text-white py-2 rounded-md text-[13px]"
            >
              Cancel Booking
            </button>
          </>
        )}

        {!isCreate && isEditing && (
          <>
            <button
              onClick={handleSave}
              className="flex-1 bg-green-500 text-white py-2 rounded-md text-[13px]"
            >
              Save
            </button>

            <button
              onClick={() => {
                setForm(booking);
                setIsEditing(false);
              }}
              className="flex-1 bg-gray-300 py-2 rounded-md text-[13px]"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingPanel;
