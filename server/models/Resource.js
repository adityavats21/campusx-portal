const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  branch: { type: String, required: true },
  semester: { type: String, required: true },
  fileLink: { type: String, required: true },
  extractedText: String,
  summary: String, 
  uploadedBy: String, 
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
