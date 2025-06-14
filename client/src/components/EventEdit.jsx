import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventEdit = () => {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5006/api/events/${eventId}`)
      .then(res => {
        setEventData(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch event');
        setLoading(false);
      });
  }, [eventId]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put(`http://localhost:5006/api/events/${eventId}`, eventData)
      .then(() => navigate('/dashboard'))
      .catch(() => setError('Failed to update event'));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
      <input name="title" value={eventData.title} onChange={handleChange} className="mb-3 w-full p-2 border" />
      <textarea name="description" value={eventData.description} onChange={handleChange} className="mb-3 w-full p-2 border" />
      <input name="date" type="date" value={eventData.date.slice(0, 10)} onChange={handleChange} className="mb-3 w-full p-2 border" />
      <button onClick={handleUpdate} className="bg-indigo-600 text-white px-4 py-2 rounded">Update</button>
    </div>
  );
};

export default EventEdit;
