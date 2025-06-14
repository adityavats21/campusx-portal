import React from 'react';
import PropTypes from 'prop-types';

const EventList = ({ events = [], onEdit, onDelete }) => {
  const handleDelete = (id) => {
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this event?')) {
      onDelete(id);
    }
  };

  return (
    <div style={styles.container} className="event-list-container">
      <h2 style={styles.heading}>Admin Event List</h2>
      {events.length === 0 ? (
        <p style={styles.noEventsText}>No events found. Please add some events.</p>
      ) : (
        <table style={styles.table} aria-label="Event List Table">
          <thead>
            <tr>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Branch</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id} style={styles.tr}>
                <td style={styles.td}>{event.title}</td>
                <td style={styles.td}>{new Date(event.date).toLocaleDateString()}</td>
                <td style={styles.td}>{event.branch}</td>
                <td style={styles.td}>
                  <button
                    type="button"
                    aria-label={`Edit event ${event.title}`}
                    style={{ ...styles.button, ...styles.editBtn }}
                    onClick={() => onEdit(event._id)}
                    onKeyDown={(e) => e.key === 'Enter' && onEdit(event._id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete event ${event.title}`}
                    style={{ ...styles.button, ...styles.deleteBtn }}
                    onClick={() => handleDelete(event._id)}
                    onKeyDown={(e) => e.key === 'Enter' && handleDelete(event._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '20px auto',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#2c3e50',
  },
  noEventsText: {
    textAlign: 'center',
    color: '#888',
    fontSize: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#2980b9',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
  },
  tr: {
    borderBottom: '1px solid #ddd',
  },
  td: {
    padding: '12px',
  },
  button: {
    marginRight: '10px',
    padding: '8px 14px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
    userSelect: 'none',
  },
  editBtn: {
    backgroundColor: '#27ae60',
    color: 'white',
  },
  deleteBtn: {
    backgroundColor: '#c0392b',
    color: 'white',
  },
};

// PropTypes for type checking & better dev experience
EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      branch: PropTypes.string.isRequired,
    })
  ),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EventList;