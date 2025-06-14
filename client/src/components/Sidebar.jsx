import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiUpload,
  FiList,
  FiCpu,
  FiCalendar,
  FiMenu,
  FiX,
  FiLogOut,
} from 'react-icons/fi';

const Sidebar = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: '/dashboard/upload-resource', label: 'Upload Resource', icon: <FiUpload size={20} /> },
    { to: '/dashboard/resources', label: 'Resource List', icon: <FiList size={20} /> },
    { to: '/dashboard/ai-summary', label: 'AI Summarizer', icon: <FiCpu size={20} /> },
    { to: '/dashboard/events', label: 'Manage Events', icon: <FiCalendar size={20} /> }, // ✅ Corrected route
  ];

  return (
    <>
      {/* Mobile top bar */}
      <div className="bg-gray-900 text-white flex items-center justify-between p-4 md:hidden">
        <h3 className="text-xl font-bold">CampusX</h3>
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-gray-900 text-white p-6 w-56
          flex flex-col
          transform md:transform-none transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          z-50
        `}
      >
        <h3 className="text-2xl font-extrabold mb-8">CampusX</h3>
        <nav className="flex-grow">
          <ul>
            {links.map(({ to, label, icon }) => (
              <li key={to} className="mb-6">
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-md font-semibold
                     transition-colors duration-200 hover:bg-gray-700
                     ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300'}`
                  }
                  onClick={() => setIsOpen(false)} // close menu on mobile after click
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button at bottom */}
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-2 px-3 py-2 rounded-md font-semibold hover:bg-red-700 text-red-500 hover:text-white transition-colors"
          aria-label="Logout"
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Overlay when mobile sidebar open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;