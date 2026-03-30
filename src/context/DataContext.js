import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [therapists, setTherapists] = useState([]);
  const [therapistIdToColumn, setTherapistIdToColumn] = useState({});
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentDate, setCurrentDate] = useState("16-08-2025");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const findArray = (obj) => {
    if (Array.isArray(obj)) return obj;
    if (!obj || typeof obj !== 'object') return null;
    for (let key in obj) {
      if (Array.isArray(obj[key])) return obj[key];
      const nested = findArray(obj[key]);
      if (nested) return nested;
    }
    return null;
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      
      const bResponse = await apiService.getBookings();
      const bRaw = bResponse?.data?.data || bResponse?.data || bResponse || {};
      const bArray = bRaw.list?.bookings || bRaw.bookings || findArray(bResponse) || [];
      setBookings(bArray);

      let detectedDate = "30-03-2026"; // Better default for your data
      if (bArray.length > 0) {
        for (const booking of bArray) {
          const rawDate = booking.service_at || booking.start_at || booking.date || booking.service_date || "";
          const match = rawDate.match(/(\d{4}-\d{2}-\d{2})|(\d{2}-\d{2}-\d{4})/);
          if (match) {
            const found = match[0];
            if (found.includes("-") && found.split("-")[0].length === 4) {
              const [y, m, d] = found.split("-");
              detectedDate = `${d}-${m}-${y}`;
            } else {
              detectedDate = found;
            }
            console.log("Detected Data Date:", detectedDate);
            break;
          }
        }
      }
      
      setCurrentDate(detectedDate);

      const tResponse = await apiService.getTherapists({ service_at: `${detectedDate} 10:00:00` });
      const tRaw = tResponse?.data?.data || tResponse?.data || tResponse || {};
      const tArray = tRaw.list?.therapists || tRaw.therapists || findArray(tResponse) || [];
      const formattedTherapists = tArray.map(t => {
        const id = Number(t.therapist_id || t.id);
        return {
          ...t,
          id: id,
          name: t.alias || t.name || t.fullname || `T-${id || '?'}`,
          gender: (t.gender && t.gender.toLowerCase().includes('female')) ? 'Female' : 'Male'
        };
      });
      
      const idMap = {};
      formattedTherapists.forEach((t, index) => {
        idMap[t.id] = index;
      });

      setTherapists(formattedTherapists);
      setTherapistIdToColumn(idMap);

      const uResponse = await apiService.getUsers({ daterange: `${detectedDate} / ${detectedDate}` });
      const uRaw = uResponse?.data?.data || uResponse?.data || uResponse || {};
      const uArray = uRaw.list?.users || uRaw.users || findArray(uResponse) || [];
      setUsers(uArray);

      setError(null);
    } catch (err) {
      console.error("Failed to fetch data", err);
      setError(err.message || 'Error fetching data');
    } finally {
      setIsLoading(false);
    }
  };

  const finalTherapists = React.useMemo(() => {
    const list = [...therapists];
    bookings.forEach(b => {
      let bItems = [];
      const bi = b.booking_item || b.booking_items;
      if (Array.isArray(bi)) {
        bItems = bi;
      } else if (bi && typeof bi === 'object') {
        Object.values(bi).forEach(arr => {
          if (Array.isArray(arr)) bItems.push(...arr);
        });
      }

      bItems.forEach(item => {
        const tIdRaw = item.therapist_id || item.staff_id;
        const tNameRaw = item.therapist || item.staff_name;
        if (tIdRaw && !list.find(t => Number(t.id) === Number(tIdRaw))) {
          list.push({ 
            id: Number(tIdRaw), 
            name: tNameRaw || `T-${tIdRaw}`, 
            gender: 'Male' 
          });
        }
      });
    });
    return list;
  }, [therapists, bookings]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ 
      therapists: finalTherapists, 
      therapistIdToColumn, 
      bookings, 
      users, 
      currentDate,
      isLoading, 
      error, 
      refreshData: fetchData 
    }}>
      {children}
    </DataContext.Provider>
  );
};
