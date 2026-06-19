import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../api';

const EventAdminList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', date: '' });
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(apiUrl('/api/events'));
      setEvents(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch events');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await axios.delete(apiUrl(`/api/events/${id}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (err) {
      alert('Delete failed.');
    }
  };

  const handleEdit = (event) => {
    setFormData({ title: event.title, description: event.description, date: event.date.split('T')[0] });
    setEditId(event._id);
    setShowForm(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(apiUrl(`/api/events/${editId}`), formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(apiUrl('/api/events'), formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({ title: '', description: '', date: '' });
      setEditId(null);
      setShowForm(false);
      fetchEvents();
    } catch (err) {
      alert('Failed to save event.');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading events...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-6 ml-60">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage Events</h2>
        <button
          onClick={() => {
            setEditId(null);
            setFormData({ title: '', description: '', date: '' });
            setShowForm(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          + Create Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white rounded-xl shadow-md p-6 border">
            <h3 className="text-xl font-bold text-indigo-700 mb-2">{event.title}</h3>
            <p className="text-gray-600 mb-2">{event.description}</p>
            <p className="text-sm text-gray-500 mb-3">
              <strong>Date:</strong>{' '}
              {new Date(event.date).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(event)}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Event Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">{editId ? 'Edit Event' : 'Add New Event'}</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full border px-4 py-2 rounded"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                className="w-full border px-4 py-2 rounded"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
              <input
                type="date"
                className="w-full border px-4 py-2 rounded"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                  {editId ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventAdminList;
