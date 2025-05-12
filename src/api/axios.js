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
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const refreshResponse = await api.post("/auth/refresh-token", { refreshToken });
          const newToken = refreshResponse.data.token;
          localStorage.setItem('token', newToken);
          api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest); // Повторяем исходный запрос с новым токеном
        } catch (refreshError) {
          // Если refreshToken невалиден, разлогиниваем
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          window.location.href = "/login"; // Принудительный редирект
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
