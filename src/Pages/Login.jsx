import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../components/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", form);
      login(response.data.token, response.data.role, response.data.email);
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('token', response.data.token);
      storage.setItem('refreshToken', response.data.refreshToken);
      storage.setItem('email', form.email);
      storage.setItem('role', response.data.role);

      api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

      // Устанавливаем заголовок авторизации для всех запросов
      api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

      alert("Login successful!");
      navigate("/");
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Invalid credentials");
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f4f3] px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="font-bold text-5xl mb-6">
          RentCar <span className="bg-[#f84525] text-white px-4 rounded-md">KG</span>
        </h2>
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        <p className="text-lg text-gray-600 mt-3">Sign in to your account</p>
      </div>

      <div className="w-full max-w-2xl bg-white p-12 rounded-2xl shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-xl py-4 px-6 border-2 border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-[#f84525] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700 mb-3">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl py-4 px-6 border-2 border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-[#f84525] focus:border-transparent"
                required
              />
              <div className="absolute inset-y-0 right-5 flex items-center cursor-pointer">
                {showPassword ? (
                  <FiEyeOff
                    onClick={() => setShowPassword(false)}
                    className="text-gray-500 hover:text-gray-700"
                    size={28}
                  />
                ) : (
                  <FiEye
                    onClick={() => setShowPassword(true)}
                    className="text-gray-500 hover:text-gray-700"
                    size={28}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-6 w-6 rounded border-2 border-gray-300 text-[#f84525] focus:ring-[#f84525]"
              />
              <label htmlFor="remember" className="text-lg text-gray-600">
                Remember me
              </label>
            </div>
            <a href="/forgot-password" className="text-lg text-[#f84525] hover:underline font-medium">
              Forgot password?
            </a>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-5 px-6 bg-[#f84525] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-xl font-semibold text-xl text-white transition duration-200">
              Sign In
            </button>
          </div>

          <div className="text-center text-lg text-gray-600 pt-4">
            <p>
              Don't have an account?{' '}
              <a href="/register" className="text-[#f84525] hover:underline font-semibold">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;