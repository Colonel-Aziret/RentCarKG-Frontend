import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../components/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '', role: 'CLIENT' });
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", form);
      login(response.data.token);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert("Registration error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f4f3] px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="font-bold text-5xl mb-6">
          RentCar <span className="bg-[#f84525] text-white px-4 rounded-md">KG</span>
        </h2>
        <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
        <p className="text-lg text-gray-600 mt-3">Register to get started</p>
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
                placeholder="Create a password"
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

          <div className="flex items-center gap-4 pt-2">
            <input
              type="checkbox"
              id="remember"
              className="h-6 w-6 rounded border-2 border-gray-300 text-[#f84525] focus:ring-[#f84525]"
            />
            <label htmlFor="remember" className="text-lg text-gray-600">
              Remember me
            </label>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-5 px-6 bg-[#f84525] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-xl font-semibold text-xl text-white transition duration-200">
              Register
            </button>
          </div>

          <div className="text-center text-lg text-gray-600 pt-4">
            <p>
              Already have an account?{' '}
              <a href="/login" className="text-[#f84525] hover:underline font-semibold">
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;