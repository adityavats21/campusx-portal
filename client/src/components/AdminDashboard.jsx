import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  LogOut,
  ClipboardList,
  BookOpenCheck
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const cards = [
    {
      label: 'Event Upload',
      icon: <UploadCloud className="w-6 h-6 text-blue-600" />,
      action: () => navigate('/dashboard/event-upload'),
    },
    {
      label: 'Resource Upload',
      icon: <FileText className="w-6 h-6 text-green-600" />,
      action: () => navigate('/dashboard/upload-resource'),
    },
    {
      label: 'View Resources',
      icon: <ClipboardList className="w-6 h-6 text-purple-600" />,
      action: () => navigate('/dashboard/resource-list'),
    },
    {
      label: 'Logout',
      icon: <LogOut className="w-6 h-6 text-red-600" />,
      action: handleLogout,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Welcome, Admin</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={card.action}
              className="cursor-pointer bg-white p-6 rounded-2xl shadow-md border hover:shadow-xl transition-all duration-300 flex items-center space-x-4 hover:bg-gray-100"
            >
              {card.icon}
              <span className="text-lg font-medium text-gray-700">{card.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
