const express = require('express');
const router = express.Router();
const multer = require('multer');
const { summarizePdf } = require('../controllers/aiController');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 }
});

router.post('/summarize', upload.single('file'), summarizePdf);

module.exports = router;
