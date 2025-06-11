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

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

// RSVP to event
router.post('/:id/rsvp', rsvpEvent);

// Protected route for students to get events
router.get('/student/events', authStudentMiddleware, getEventsForStudents);

module.exports = router;