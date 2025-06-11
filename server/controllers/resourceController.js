const Resource = require('../models/Resource');
const axios = require('axios');
const pdfParse = require('pdf-parse');
const cloudinary = require("cloudinary").v2;
const fs = require('fs');
// Upload a new study resource
exports.uploadResource = async (req, res) => {
  try {
    const { title, branch, semester, uploadedBy } = req.body;
    const file = req.file;

    if (!file || !file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const uploadedResponse = await cloudinary.uploader.upload(file.path, {
      resource_type: "raw",
      folder: "campusx-resources",
      use_filename: true,
      unique_filename: false,
      type: "upload"
    });

    let extractedText = '';
    if (file.mimetype === 'application/pdf') {
      const response = await axios.get(uploadedResponse.secure_url, { responseType: 'arraybuffer' });
      const pdfBuffer = Buffer.from(response.data);
      const pdfData = await pdfParse(pdfBuffer);
      extractedText = pdfData.text;
    }

    const newResource = new Resource({
      title,
      branch,
      semester,
      uploadedBy,
      fileLink: uploadedResponse.secure_url,
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
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.status(200).json(resources);
  } catch (err) {
    console.error("FETCH ERROR:", err);
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