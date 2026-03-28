import { useEffect, useState } from "react";
import { therapists as localTherapists } from "../../data/therapists";

const TherapistRow = () => {
  const [therapists, setTherapists] = useState([]);

  const columnWidth = 100;
  const timeColumnWidth = 80;

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const res = await fetch("/api/therapists");
        const data = await res.json();
        setTherapists(data);
      } catch (error) {
        setTherapists(localTherapists);
      }
    };

    fetchTherapists();
  }, []);

  return (
    <div className="w-full bg-white border-b border-gray-200 overflow-x-auto">
      <div
        className="min-w-max"
        style={{
          display: "grid",
          gridTemplateColumns: `${timeColumnWidth}px repeat(${therapists.length}, ${columnWidth}px)`,
        }}
      >
        <div className="flex items-center justify-center text-[12px] font-semibold">
          Time
        </div>

        {therapists.map((t) => (
          <div
            key={t.id}
            className="flex flex-col items-center justify-center py-3"
          >
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white text-[12px] font-bold 
              ${t.gender === "Male" ? "bg-blue-500" : "bg-pink-500"}`}
            >
              {t.id}
            </div>

            <div className="text-[12px] font-semibold mt-1 text-center">
              {t.name}
            </div>

            <div className="text-[10px] text-gray-400 text-center">
              {t.gender}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistRow;
