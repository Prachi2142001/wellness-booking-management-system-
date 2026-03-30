import { useData } from "../../context/DataContext";

const TherapistRow = () => {
  const { therapists, isLoading } = useData();

  const columnWidth = 100;
  const timeColumnWidth = 80;

  if (isLoading) {
    return (
      <div className="w-full bg-white border-b border-gray-200 overflow-x-auto py-4 flex items-center justify-center">
        <span className="text-gray-400 text-sm font-semibold animate-pulse">Loading Therapists...</span>
      </div>
    );
  }

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
            className="flex items-center gap-2 px-2 py-3"
            style={{ width: columnWidth }}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-white text-[12px] font-bold 
              ${t.gender === "Male" ? "bg-blue-500" : "bg-pink-500"}`}
            >
              {t.id}
            </div>

            <div className="flex flex-col min-w-0">
              <div className="text-[12px] font-bold text-gray-800 truncate leading-tight">
                {t.name || t.alias}
              </div>
              <div className="text-[10px] text-gray-400 capitalize">
                {t.gender}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistRow;
