import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../api';

const ResourceUpload = ({ token }) => {
  const [formData, setFormData] = useState({
    title: '',
    branch: '',
    semester: '',
    uploadedBy: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.branch.trim()) newErrors.branch = 'Branch is required';

    if (!formData.semester || formData.semester < 1 || formData.semester > 8) {
      newErrors.semester = 'Semester must be between 1 and 8';
    }

    if (!formData.uploadedBy.trim()) newErrors.uploadedBy = 'Name is required';

    if (!file) newErrors.file = 'Please select a PDF file to upload';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setSuccess(false);

    const data = new FormData();
    data.append('file', file);
    data.append('title', formData.title);
    data.append('branch', formData.branch);
    data.append('semester', formData.semester);
    data.append('uploadedBy', formData.uploadedBy);

    try {
      await axios.post(apiUrl('/api/resources'), data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });

      setSuccess(true);
      setFormData({
        title: '',
        branch: '',
        semester: '',
        uploadedBy: ''
      });
      setFile(null);
      setErrors({});
      e.target.reset();

    } catch (err) {
      console.error('Upload error:', err);
      alert('Error uploading file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        📄 Upload Study Resource
      </h2>

      {success && (
        <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-center font-medium">
          ✅ Resource uploaded successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <div className="space-y-5">
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 transition ${
                errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <input
              type="text"
              name="branch"
              placeholder="Branch"
              value={formData.branch}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 transition ${
                errors.branch ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.branch && <p className="text-red-600 text-sm mt-1">{errors.branch}</p>}
          </div>

          <div>
            <input
              type="number"
              name="semester"
              placeholder="Semester"
              value={formData.semester}
              onChange={handleChange}
              min="1"
              max="8"
              className={`w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 transition ${
                errors.semester ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.semester && <p className="text-red-600 text-sm mt-1">{errors.semester}</p>}
          </div>

          <div>
            <input
              type="text"
              name="uploadedBy"
              placeholder="Your Name"
              value={formData.uploadedBy}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 transition ${
                errors.uploadedBy ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {errors.uploadedBy && <p className="text-red-600 text-sm mt-1">{errors.uploadedBy}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Select PDF File</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              accept="application/pdf"
              className={`w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition ${
                errors.file ? 'border border-red-500' : ''
              }`}
            />
            {file && <p className="text-sm text-gray-600 mt-1">📎 {file.name}</p>}
            {errors.file && <p className="text-red-600 text-sm mt-1">{errors.file}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {loading ? 'Uploading...' : 'Upload Resource'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResourceUpload;
