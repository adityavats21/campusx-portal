import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('studentToken');

  useEffect(() => {
    if (!token) return;

    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5006/api/events/student/events', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(res.data);
      } catch (err) {
        setError('Failed to fetch events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [token]);

  if (!token) {
    return <div className="text-center p-6">Please login to view events.</div>;
  }

  if (loading) return <div className="text-center p-6">Loading events...</div>;

  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-indigo-700">Upcoming Events</h2>
      {events.length === 0 ? (
        <p className="text-gray-600">No events available right now.</p>
      ) : (
        <ul className="space-y-4">
          {events.map(event => (
            <li key={event._id} className="p-4 border rounded shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-indigo-600">{event.name}</h3>
              <p className="text-gray-700">{event.description}</p>
              <p className="text-gray-500 text-sm">Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-500 text-sm">Venue: {event.venue}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentEvents;
