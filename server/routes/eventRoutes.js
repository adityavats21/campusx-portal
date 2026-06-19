const express = require('express');
const router = express.Router();

const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  rsvpEvent,
  getEventsForStudents
} = require('../controllers/eventController');

const authStudentMiddleware = require('../middleware/authStudentMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', getAllEvents);
router.get('/student/events', authStudentMiddleware, getEventsForStudents);
router.get('/:id', getEventById);
router.post('/', authMiddleware, createEvent);
router.put('/:id', authMiddleware, updateEvent);
router.delete('/:id', authMiddleware, deleteEvent);

// RSVP to event
router.post('/:id/rsvp', rsvpEvent);

module.exports = router;
