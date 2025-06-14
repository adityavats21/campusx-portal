// src/components/Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:block fixed top-0 left-0 h-full w-64 z-50 bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main content shifted right using padding-left (not margin) */}
      <div className="md:pl-64 p-4 pt-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
