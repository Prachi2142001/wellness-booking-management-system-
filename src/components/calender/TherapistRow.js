import { useData } from "../../context/DataContext";

const TherapistRow = () => {
  const { therapists } = useData();

  const columnWidth = 100;

  const isFemale = (gender) =>
    String(gender || "").toLowerCase().includes("female") ||
    String(gender || "").toLowerCase() === "f";

  return (
    <div
      className="flex bg-white border-b border-gray-200"
      style={{ minWidth: `${therapists.length * columnWidth}px`, height: 72 }}
    >
      {therapists.map((t, index) => {
        const female = isFemale(t.gender);
        const badgeColor = female ? "#EC4899" : "#3B82F6";
        const genderLabel = female ? "Female" : "Male";

        return (
          <div
            key={t.id || index}
            className="flex items-center justify-center border-r border-gray-200 px-1 flex-shrink-0"
            style={{ width: columnWidth, minWidth: columnWidth }}
          >
            <div className="flex items-center gap-[6px]">
              <div
                className="w-[24px] h-[24px] rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                style={{ backgroundColor: badgeColor }}
              >
                {index + 1}
              </div>

              <div className="flex flex-col items-start leading-none gap-[2px]">
                <div className="text-[12px] font-bold text-[#111827] truncate max-w-[50px]">
                  {t.name || t.alias || `T-${t.id}`}
                </div>
                <div className="text-[9px] font-bold text-[#111827]">
                  {genderLabel}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TherapistRow;