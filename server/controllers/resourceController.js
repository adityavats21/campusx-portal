const Resource = require('../models/Resource');
const axios = require('axios');
const pdfParse = require('pdf-parse');
// Upload a new study resource
exports.uploadResource = async (req, res) => {
  try {
    const { title, branch, semester, uploadedBy } = req.body;
    const file = req.file;

    if (!file || !file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let extractedText = '';
    if (file.mimetype === 'application/pdf') {
      const response = await axios.get(file.path, { responseType: 'arraybuffer' });
      const pdfBuffer = Buffer.from(response.data);
      const pdfData = await pdfParse(pdfBuffer);
      extractedText = pdfData.text;
    }

    const newResource = new Resource({
      title,
      branch,
      semester,
      uploadedBy,
      fileLink: file.path,
      extractedText,
    });

    await newResource.save();
    res.status(201).json(newResource);
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ message: "Server error during resource upload" });
  }
};



// Delete resource by ID
exports.deleteResource = async (req, res) => {
  try {
    const resourceId = req.params.id;

    const resource = await Resource.findById(resourceId);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Optionally delete from Cloudinary via API (if needed)
    // Skipping actual Cloudinary deletion for now

    await Resource.findByIdAndDelete(resourceId);
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: 'Server error while deleting resource' });
  }
};

// Get all resources
exports.getAllResources = async (req, res) => {
  try {
    const filter = {};
    if (req.query.branch) filter.branch = req.query.branch;
    if (req.query.semester) filter.semester = req.query.semester;

    const resources = await Resource.find(filter).sort({ createdAt: -1 });
    res.status(200).json(resources);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.status(200).json(resource);
  } catch (err) {
    console.error("FETCH BY ID ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// Update a resource by ID
exports.updateResource = async (req, res) => {
  try {
    const resourceId = req.params.id;
    const { title, branch, semester, uploadedBy } = req.body;

    const updatedResource = await Resource.findByIdAndUpdate(
      resourceId,
      { title, branch, semester, uploadedBy },
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.status(200).json(updatedResource);
  } catch (error) {
    console.error('UPDATE ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};
