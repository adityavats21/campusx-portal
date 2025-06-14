import { Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ResourceUpload from './components/ResourceUpload';
import AdminRoute from './components/AdminRoute';

function App() {
  const token = localStorage.getItem('adminToken');

  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/dashboard/*"
        element={
          <AdminRoute token={token}>
            <DashboardLayout />
          </AdminRoute>
        }
      />
    </Routes>
  );
}