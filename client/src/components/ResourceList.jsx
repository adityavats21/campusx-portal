import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText, User, Clock, Edit, Trash2, Save, X } from 'lucide-react';
import { API_BASE_URL, apiUrl } from '../api';

const ResourceList = ({ token }) => {
  const [resources, setResources] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedResource, setEditedResource] = useState({
    title: '',
    branch: '',
    semester: '',
    uploadedBy: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const res = await axios.get(apiUrl('/api/resources'));
        setResources(res.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch resources');
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;

    try {
      await axios.delete(apiUrl(`/api/resources/${id}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setResources(resources.filter((r) => r._id !== id));
    } catch (err) {
      alert('Failed to delete resource');
    }
  };

  const handleEditClick = (resource) => {
    setEditingId(resource._id);
    setEditedResource({
      title: resource.title,
      branch: resource.branch,
      semester: resource.semester,
      uploadedBy: resource.uploadedBy,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedResource({
      title: '',
      branch: '',
      semester: '',
      uploadedBy: '',
    });
  };

  const handleChange = (e) => {
    setEditedResource({ ...editedResource, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(
        apiUrl(`/api/resources/${id}`),
        editedResource,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResources(resources.map((r) => (r._id === id ? res.data : r)));
      handleCancelEdit();
    } catch (err) {
      alert('Failed to update resource');
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getFullFileLink = (link) => {
    if (!link) return '#';
    if (link.startsWith('http')) return link;
    const cleanLink = link.startsWith('/') ? link.substring(1) : link;
    return `${API_BASE_URL}/${cleanLink}`;
  };

  if (loading) {
    return <div className="text-center mt-10 text-gray-500">Loading resources...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full md:pl-56">
      <div className="max-w-7xl mx-auto px-4 py-6 min-h-[100vh]">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-700">Uploaded Resources</h2>

        {resources.length === 0 ? (
          <div className="text-center text-gray-500">No resources uploaded yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div
                key={resource._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 p-5 border border-gray-100"
              >
                {editingId === resource._id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="title"
                      value={editedResource.title}
                      onChange={handleChange}
                      placeholder="Title"
                      className="w-full border px-3 py-2 rounded"
                      required
                    />
                    <input
                      type="text"
                      name="branch"
                      value={editedResource.branch}
                      onChange={handleChange}
                      placeholder="Branch"
                      className="w-full border px-3 py-2 rounded"
                      required
                    />
                    <input
                      type="text"
                      name="semester"
                      value={editedResource.semester}
                      onChange={handleChange}
                      placeholder="Semester"
                      className="w-full border px-3 py-2 rounded"
                      required
                    />
                    <input
                      type="text"
                      name="uploadedBy"
                      value={editedResource.uploadedBy}
                      onChange={handleChange}
                      placeholder="Uploaded By"
                      className="w-full border px-3 py-2 rounded"
                      required
                    />
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleUpdate(resource._id)}
                        className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        <Save size={16} /> Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex items-center gap-1 bg-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-400"
                      >
                        <X size={16} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-blue-600 flex items-center gap-2">
                      <FileText size={18} />
                      <a
                        href={getFullFileLink(resource.fileLink)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-blue-600"
                      >
                        {resource.title}
                      </a>
                    </h3>
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                      <User size={16} /> {resource.uploadedBy}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Branch:</strong> {resource.branch} |{' '}
                      <strong>Semester:</strong> {resource.semester}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={14} /> {formatDate(resource.createdAt)}
                    </p>

                    {token && (
                      <div className="flex gap-3 pt-3">
                        <button
                          onClick={() => handleEditClick(resource)}
                          className="flex items-center gap-1 bg-yellow-400 px-3 py-1 rounded text-sm hover:bg-yellow-500"
                        >
                          <Edit size={16} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(resource._id)}
                          className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceList;
