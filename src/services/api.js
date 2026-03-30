import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://dev.natureland.hipster-virtual.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && token !== 'undefined' && token !== 'null' && token !== '[object Object]') {
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${token}`
    };
  }
  return config;
});

export const apiService = {
  login: async (email, password, key_pass) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('key_pass', key_pass);
      const response = await apiClient.post('/api/v1/login', formData);
      
      const resData = response.data;
      console.log("LOGIN RESPONSE FULL PAYLOAD:", resData);

      const findToken = (obj) => {
        if (!obj || typeof obj !== 'object') return null;
    
        const priorities = ['token', 'access_token', 'bearer_token', 'jwt', 'key'];
        for (const key of priorities) {
          if (typeof obj[key] === 'string') return obj[key];
          if (typeof obj[key] === 'object') {
             const sub = findToken(obj[key]);
             if (sub) return sub;
          }
        }
        for (const value of Object.values(obj)) {
          if (typeof value === 'string' && value.length > 20) return value; // Tokens are usually long
          if (typeof value === 'object') {
            const result = findToken(value);
            if (result) return result;
          }
        }
        return null;
      };

      const tokenString = findToken(resData);

      if (tokenString) {
        localStorage.setItem('access_token', tokenString);
        console.log("SUCCESSFULLY EXTRACTED TOKEN STRING!");
      } else {
        alert("CRITICAL: No token string found in login response. See console for full payload structure.");
      }
      
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },
  getTherapists: async (params = {}) => {
    const defaultParams = { 
      availability: 0, 
      outlet: 1, 
      service_at: "16-08-2025 10:00:00", 
      services: 1, 
      status: 1, 
      pagination: 0, 
      panel: 'outlet', 
      outlet_type: 2, 
      leave: 1 
    };
    const response = await apiClient.get('/api/v1/therapists', { 
      params: { ...defaultParams, ...params } 
    });
    
    return response.data || [];
  },
  getBookings: async (params = {}) => {
    const defaultParams = {
      pagination: 1,
      daterange: "01-08-2025 / 31-03-2026",
      outlet: 1,
      panel: 'outlet',
      view_type: 'calendar'
    };
    const response = await apiClient.get('/api/v1/bookings/outlet/booking/list', {
      params: { ...defaultParams, ...params }
    });
    return response.data;
  },
  getUsers: async (params = {}) => {
    const defaultParams = {
      pagination: 1,
      daterange: "22-03-2026 / 30-03-2026"
    };
    const response = await apiClient.get('/api/v1/users', {
      params: { ...defaultParams, ...params }
    });
    return response.data;
  },
  updateBooking: async (id, data) => {
    const response = await apiClient.put(`/api/v1/bookings/${id}`, data);
    return response.data;
  },
  createBooking: async (data) => {
    const response = await apiClient.post('/api/v1/bookings/create', data);
    return response.data;
  },
  cancelBookingItem: async (data) => {
    const response = await apiClient.post('/api/v1/bookings/item/cancel', data);
    return response.data;
  },
  deleteBooking: async (id) => {
    const response = await apiClient.delete(`/api/v1/bookings/destroy/${id}`);
    return response.data;
  }
};

export default apiService;
