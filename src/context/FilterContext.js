import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    status: ["confirmed", "unconfirmed", "in_progress", "completed", "cancelled", "holding", "checked_in", "no_show"],
    therapists: [],
    search: "", 
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);