import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const StudentLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Email is invalid';
    }
    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errs.password = 'Min 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError('');
    try {
      const res = await axios.post('http://localhost:5006/api/students/login', formData);
      localStorage.setItem('studentToken', res.data.token);
      if (typeof onLogin === 'function') onLogin(res.data.token);
      navigate('/student/dashboard');
    } catch (err) {
      setServerError(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black bg-cover bg-center relative px-4"
      style={{
        backgroundImage: `url('/images/student-ai-login.png')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-xl text-white p-8 rounded-3xl shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-lg">
          Student Login
        </h2>

        {serverError && (
          <div className="mb-4 text-red-400 text-center font-semibold">{serverError}</div>
        )}

        {/* Email Field */}
        <div className="mb-5">
          <label className="text-sm font-semibold mb-1 block">Email</label>
          <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3">
            <FiMail className="text-white mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="bg-transparent w-full py-2 text-white placeholder-gray-300 focus:outline-none"
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-sm mt-1 font-medium">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="text-sm font-semibold mb-1 block">Password</label>
          <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3">
            <FiLock className="text-white mr-2" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-transparent w-full py-2 text-white placeholder-gray-300 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none ml-2"
            >
              {showPassword ? <FiEyeOff className="text-white" /> : <FiEye className="text-white" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-sm mt-1 font-medium">{errors.password}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-500 hover:bg-indigo-600 transition text-white font-semibold py-3 rounded-lg shadow-md disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Forgot */}
        <div className="mt-6 text-center text-sm text-gray-300">
          <button
            type="button"
            onClick={() => alert('Forgot password flow coming soon!')}
            className="underline hover:text-indigo-300"
          >
            Forgot password?
          </button>
        </div>

        {/* Register Prompt */}
        <div className="mt-4 text-center text-sm text-white">
          New Student?{' '}
          <button
            type="button"
            className="underline hover:text-indigo-300"
            onClick={() => navigate('/students/register')} // ✅ fixed route
          >
            Register now
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentLogin;