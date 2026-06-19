import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../api';

const AIResourceSummary = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSummary('');
  };

  const handleSummarize = async () => {
    if (!file) {
      alert('Please select a PDF file first');
      return;
    }

    setLoading(true);
    setSummary('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(apiUrl('/api/ai/summarize'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSummary(response.data.summary);
    } catch (err) {
      alert('Failed to get summary. Please try again.');
      console.error('Summarize Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🤖 AI PDF Summarizer</h2>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={styles.fileInput}
      />

      <button
        onClick={handleSummarize}
        disabled={loading}
        style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
      >
        {loading ? 'Summarizing...' : 'Get Summary'}
      </button>

      {summary && (
        <div style={styles.summaryBox}>
          <h3 style={styles.summaryHeading}>📝 Summary:</h3>
          <p style={styles.summaryText}>{summary}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: 'center',
  },
  heading: {
    fontSize: '26px',
    fontWeight: '700',
    marginBottom: '24px',
    color: '#2c3e50',
  },
  fileInput: {
    marginBottom: '20px',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
    cursor: 'pointer',
    fontSize: '15px',
  },
  button: {
    backgroundColor: '#2980b9',
    color: '#fff',
    padding: '10px 24px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    transition: 'background-color 0.3s ease',
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
    cursor: 'not-allowed',
  },
  summaryBox: {
    marginTop: '30px',
    backgroundColor: '#f5f7fa',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)',
    textAlign: 'left',
    maxHeight: '300px',
    overflowY: 'auto',
  },
  summaryHeading: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#34495e',
  },
  summaryText: {
    whiteSpace: 'pre-wrap',
    lineHeight: 1.5,
    color: '#2c3e50',
    fontSize: '16px',
  },
};

export default AIResourceSummary;
