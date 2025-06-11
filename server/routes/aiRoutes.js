const express = require('express');
const router = express.Router();
const { summarizePdf } = require('../controllers/aiController');

router.post('/summarize', summarizePdf);

module.exports = router;
