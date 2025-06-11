// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  createdBy: String, // later link with admin id
  rsvps: [{ type: String }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
