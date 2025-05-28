import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refreshToken') || 
                         sessionStorage.getItem('refreshToken');
      
      if (refreshToken) {
        try {
          const refreshResponse = await api.post("/auth/refresh-token", { refreshToken });
          const { token, refreshToken: newRefreshToken } = refreshResponse.data;
          
          const storage = localStorage.getItem('refreshToken') ? localStorage : sessionStorage;
          storage.setItem('token', token);
          storage.setItem('refreshToken', newRefreshToken);
          
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          
          return api(originalRequest);
        } catch (refreshError) {
          // Очистка и редирект
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('refreshToken');
          window.location.href = "/login";
        }
      } else {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
