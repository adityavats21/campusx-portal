import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AdminLogin from './components/AdminLogin';
import StudentLogin from './components/StudentLogin';
import StudentRegister from './components/StudentRegister'; 
import ResourceUpload from './components/ResourceUpload';
import ResourceList from './components/ResourceList';
import AIResourceSummary from './components/AIResourceSummary';
import Sidebar from './components/Sidebar';
import StudentDashboard from './components/StudentDashboard';
import StudentEvents from './components/StudentEvents';
import LandingPage from './components/LandingPage';
import EventAdminList from './components/EventAdminList';
import EventEdit from './components/EventEdit';

const ProtectedAdminRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/admin/login" replace />;
};

const ProtectedStudentRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/student/login" replace />;
};

const AdminDashboardLayout = ({ token, handleLogout }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar handleLogout={handleLogout} />
      <div style={{ flex: 1, padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Navigate to="upload-resource" replace />} />
          <Route path="upload-resource" element={<ResourceUpload token={token} />} />
          <Route path="resources" element={<ResourceList token={token} />} />
          <Route path="ai-summary" element={<AIResourceSummary />} />
          <Route path="events" element={<EventAdminList />} />
          <Route path="event/:eventId/edit" element={<EventEdit />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || null);
  const [studentToken, setStudentToken] = useState(localStorage.getItem('studentToken') || null);

  useEffect(() => {
    const syncTokens = () => {
      setAdminToken(localStorage.getItem('adminToken'));
      setStudentToken(localStorage.getItem('studentToken'));
    };
    window.addEventListener('storage', syncTokens);
    return () => window.removeEventListener('storage', syncTokens);
  }, []);

  const handleAdminLogin = (token) => {
    localStorage.setItem('adminToken', token);
    setAdminToken(token);
  };

  const handleStudentLogin = (token) => {
    localStorage.setItem('studentToken', token);
    setStudentToken(token);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminToken(null);
  };

  const handleStudentLogout = () => {
    localStorage.removeItem('studentToken');
    setStudentToken(null);
  };

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin onLogin={handleAdminLogin} />} />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedAdminRoute token={adminToken}>
              <AdminDashboardLayout token={adminToken} handleLogout={handleAdminLogout} />
            </ProtectedAdminRoute>
          }
        />

        {/* Student Login */}
        <Route
          path="/student/login"
          element={
            studentToken ? (
              <Navigate to="/student/dashboard" replace />
            ) : (
              <StudentLogin onLogin={handleStudentLogin} />
            )
          }
        />

        {/*  Student Register Route */}
        <Route path="/students/register" element={<StudentRegister />} />

        {/* Student Dashboard */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedStudentRoute token={studentToken}>
              <StudentDashboard handleLogout={handleStudentLogout} />
            </ProtectedStudentRoute>
          }
        />

        {/* Student Events */}
        <Route
          path="/student/events"
          element={
            <ProtectedStudentRoute token={studentToken}>
              <StudentEvents />
            </ProtectedStudentRoute>
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={
            adminToken ? (
              <Navigate to="/dashboard" replace />
            ) : studentToken ? (
              <Navigate to="/student/dashboard" replace />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;