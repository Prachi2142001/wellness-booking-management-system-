import { useEffect, useState } from "react";
import "./App.css";
import CalendarPage from "./pages/CalendarPage";
import { FilterProvider } from "./context/FilterContext";
import { DataProvider } from "./context/DataContext";
import apiService from "./services/api";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const authStart = async () => {
      try {
        // Force an authentic login every reload to clear stale localhost:3000 tokens from your other dev projects!
        localStorage.removeItem("access_token");
        await apiService.login("react@hipster-inc.com", "React@123", "07ba959153fe7eec778361bf42079439");
        setIsAuth(true);
      } catch (e) {
        console.error("Critical Auth Error:", e);
        // We will still mount to allow you to inspect the UI, but API calls will fail
        setIsAuth(true);
      }
    };
    authStart();
  }, []);

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center font-bold text-gray-500">
        Connecting to API Environment...
      </div>
    );
  }

  return (
    <DataProvider>
      <FilterProvider>
        <div className="w-full min-h-screen bg-[#f5f5f5]">
          <CalendarPage />
        </div>
      </FilterProvider>
    </DataProvider>
  );
}

export default App;