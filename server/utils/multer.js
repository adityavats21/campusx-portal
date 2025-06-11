const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'campusx-resources',
    resource_type: 'raw',         // 👈 REQUIRED for PDFs
    type: 'upload',               // 👈 MAKE IT PUBLIC
    allowed_formats: ['pdf', 'docx', 'ppt', 'pptx'],
    use_filename: true,           // optional but nice
    unique_filename: false        // keeps original file name
  },
});

const parser = multer({ storage });

module.exports = parser;