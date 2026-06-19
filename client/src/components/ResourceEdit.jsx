import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, X } from 'lucide-react';
import { apiUrl } from '../api';

const ResourceEdit = ({ resourceId, token, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    title: '',
    branch: '',
    semester: '',
    uploadedBy: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch resource details when component mounts
  useEffect(() => {
    if (!resourceId) return;

    const fetchResource = async () => {
      setLoading(true);
      try {
        const res = await axios.get(apiUrl(`/api/resources/${resourceId}`));
        setFormData({
          title: res.data.title || '',
          branch: res.data.branch || '',
          semester: res.data.semester || '',
          uploadedBy: res.data.uploadedBy || '',
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to load resource details');
        setLoading(false);
      }
    };

    fetchResource();
  }, [resourceId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.put(
        apiUrl(`/api/resources/${resourceId}`),
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      onUpdated(res.data); // Notify parent about update
      onClose(); // Close the edit form/modal
    } catch (err) {
      setError('Failed to update resource');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Close edit form"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Edit Resource</h2>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-600">{error}</p>}

            <div>
              <label htmlFor="title" className="block font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label htmlFor="branch" className="block font-medium mb-1">
                Branch
              </label>
              <input
                type="text"
                id="branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label htmlFor="semester" className="block font-medium mb-1">
                Semester
              </label>
              <input
                type="text"
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div>
              <label htmlFor="uploadedBy" className="block font-medium mb-1">
                Uploaded By
              </label>
              <input
                type="text"
                id="uploadedBy"
                name="uploadedBy"
                value={formData.uploadedBy}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                <Save size={16} className="inline mr-1" />
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResourceEdit;
