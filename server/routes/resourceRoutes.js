const express = require('express');
const router = express.Router();
const parser = require('../utils/multer'); // multer configured for Cloudinary or local
const authenticateAdmin = require('../middleware/authMiddleware');

const {
  uploadResource,
  getAllResources,
  deleteResource,
  updateResource
} = require('../controllers/resourceController');

router.post('/', parser.single('file'),authenticateAdmin, uploadResource);
router.get('/', getAllResources);
router.delete('/:id', deleteResource);
router.put('/:id', updateResource);

module.exports = router;
