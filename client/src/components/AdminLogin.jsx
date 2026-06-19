import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../api';

const AdminLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setServerError('');
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
  
    if (!validate()) return;
  
    setLoading(true);
    setServerError('');
  
    try {
      console.log('Sending login request with:', formData);
  
      const response = await fetch(apiUrl('/api/admin/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      console.log('Response status:', response.status);
      console.log('Response data:', data);
  
      if (response.ok) {
        if (data.token) {
          localStorage.setItem('adminToken', data.token);
          console.log('Calling onLogin with token:', data.token); // ✅ Added for debug
          if (onLogin) onLogin(data.token); // Call parent to update token state
          navigate('/dashboard');
        } else {
          setServerError('Token not received from server.');
          console.error('Login success but token missing:', data);
        }
      } else {
        setServerError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setServerError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };  

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url('/images/teacher-student.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-8 z-10">
        <div className="flex flex-col items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11c0-1.104-.895-2-2-2s-2 .896-2 2c0 1.103.895 2 2 2s2-.897 2-2zM4 12a8 8 0 1116 0 8 8 0 01-16 0z"
            />
          </svg>
          <h2 className="mt-3 text-3xl font-bold text-gray-800">Admin Login</h2>
          <p className="mt-1 text-gray-500">Welcome back! Please sign in to continue.</p>
        </div>

        {serverError && (
          <div
            role="alert"
            className="bg-red-100 text-red-700 px-4 py-2 mb-6 rounded text-center font-medium"
          >
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete="username"
              placeholder="your.email@example.com"
              className={`w-full px-4 py-3 rounded-md border ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-indigo-500'
              } focus:outline-none focus:ring-2 transition`}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-red-600 text-sm mt-1 font-medium"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div className="mb-5 relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
              autoComplete="current-password"
              placeholder="Enter your password"
              className={`w-full px-4 py-3 rounded-md border ${
                errors.password
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-indigo-500'
              } focus:outline-none focus:ring-2 transition`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600 hover:text-indigo-800 focus:outline-none"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-9 0-1.256.313-2.437.873-3.5M3 3l18 18"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-1.06 0-2.08-.18-3.008-.513"
                  />
                </svg>
              )}
            </button>
            {errors.password && (
              <p
                id="password-error"
                className="text-red-600 text-sm mt-1 font-medium"
              >
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 transition"
            aria-busy={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
