import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import { apiUrl } from '../api';

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email';
    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6) errs.password = 'Minimum 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post(apiUrl('/api/students/register'), formData);
      alert('Registration successful! Please login.');
      navigate('/student/login');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-black bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url('/images/student-ai-login.png')` }}
    >
      <div className="absolute inset-0 bg-black opacity-60" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-xl text-white p-8 rounded-3xl shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-lg">
          Student Registration
        </h2>

        {serverError && (
          <div className="mb-4 text-red-400 text-center font-semibold">{serverError}</div>
        )}

        {/* Name */}
        <div className="mb-5">
          <label className="text-sm font-semibold mb-1 block">Name</label>
          <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3">
            <FiUser className="text-white mr-2" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="bg-transparent w-full py-2 text-white placeholder-gray-300 focus:outline-none"
            />
          </div>
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
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
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm font-semibold mb-1 block">Password</label>
          <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3">
            <FiLock className="text-white mr-2" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-transparent w-full py-2 text-white placeholder-gray-300 focus:outline-none"
            />
          </div>
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-500 hover:bg-indigo-600 transition text-white font-semibold py-3 rounded-lg shadow-md disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default StudentRegister;
