import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        Welcome to CampusX Portal
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '3rem' }}>
        Please select your login type
      </p>

      <div>
        <button
          onClick={() => navigate('/admin/login')}
          style={{
            margin: '10px',
            padding: '15px 30px',
            fontSize: '1.2rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#4f46e5',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => (e.target.style.backgroundColor = '#4338ca')}
          onMouseLeave={e => (e.target.style.backgroundColor = '#4f46e5')}
        >
          Admin Login
        </button>

        <button
          onClick={() => navigate('/student/login')}
          style={{
            margin: '10px',
            padding: '15px 30px',
            fontSize: '1.2rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#10b981',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => (e.target.style.backgroundColor = '#059669')}
          onMouseLeave={e => (e.target.style.backgroundColor = '#10b981')}
        >
          Student Login
        </button>
      </div>

      <footer style={{ marginTop: '4rem', fontSize: '0.9rem', opacity: 0.7 }}>
        &copy; {new Date().getFullYear()} CampusX. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;