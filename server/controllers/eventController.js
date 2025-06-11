const Event = require('../models/Event');

// @desc    Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get single event
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Create a new event
exports.createEvent = async (req, res) => {
  const { title, description, date, location, createdBy } = req.body;
  try {
    const newEvent = new Event({ title, description, date, location, createdBy });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Update event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc    Delete event
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc RSVP to an event
exports.rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID required to RSVP' });
    }

    if (event.rsvps.includes(userId)) {
      return res.status(400).json({ message: 'User already RSVP’d' });
    }

    event.rsvps.push(userId);
    await event.save();

    res.status(200).json({ message: 'RSVP successful', rsvps: event.rsvps });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get events for authenticated student
exports.getEventsForStudents = async (req, res) => {
  try {
    // Optionally, use req.student here for filtering
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};