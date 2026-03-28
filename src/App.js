import "./App.css";
import CalendarPage from "./pages/CalendarPage";
import { FilterProvider } from "./context/FilterContext";

function App() {
  return (
    <FilterProvider>
      <div className="w-full min-h-screen bg-[#f5f5f5]">
        <CalendarPage />
      </div>
    </FilterProvider>
  );
}

export default App;