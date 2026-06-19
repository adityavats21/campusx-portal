const express = require('express');
const router = express.Router();
const parser = require('../utils/multer'); // multer configured for Cloudinary or local
const authenticateAdmin = require('../middleware/authMiddleware');

const {
  uploadResource,
  getAllResources,
  getResourceById,
  deleteResource,
  updateResource
} = require('../controllers/resourceController');

router.post('/', parser.single('file'),authenticateAdmin, uploadResource);
router.get('/', getAllResources);
router.get('/:id', getResourceById);
router.delete('/:id', authenticateAdmin, deleteResource);
router.put('/:id', authenticateAdmin, updateResource);

module.exports = router;
