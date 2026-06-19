import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../api';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Get token from localStorage
  const token = localStorage.getItem('studentToken');
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) return;

    const fetchStudentData = async () => {
      try {
        // Fetch student profile
        const profileRes = await axios.get(apiUrl('/api/students/profile'), {
          headers: { Authorization: `Bearer ${token}` },
        });

        const studentData = profileRes.data;
        setStudent(studentData);

        // Fetch resources filtered by branch and semester
        const resourcesRes = await axios.get(apiUrl('/api/resources'), {
          params: { branch: studentData.branch, semester: studentData.semester },
        });

        setResources(resourcesRes.data);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    window.location.href = '/student/login';
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please login to access dashboard.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-600">
        <p>{error}</p>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">
          Welcome, {student?.name || 'Student'}!
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Events Link Button */}
      <div className="mb-8">
      <button
        onClick={() => navigate('/student/events')}
        className="inline-block px-5 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        View Upcoming Events
      </button>


      </div>

      <div className="mb-6 bg-white rounded-lg shadow p-5">
        <h2 className="text-xl font-semibold mb-3">Your Details</h2>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Branch:</strong> {student.branch}</p>
        <p><strong>Semester:</strong> {student.semester}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-xl font-semibold mb-6">Resources for You</h2>
        {resources.length === 0 ? (
          <p className="text-gray-600">No resources available for your branch and semester.</p>
        ) : (
          <ul className="space-y-4">
            {resources.map(resource => (
              <li key={resource._id} className="border p-4 rounded hover:shadow-md transition">
                <a
                  href={resource.fileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  {resource.title}
                </a>
                <p className="text-gray-700 text-sm">Uploaded by: {resource.uploadedBy}</p>
                <p className="text-gray-500 text-xs">
                  Branch: {resource.branch} | Semester: {resource.semester}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
