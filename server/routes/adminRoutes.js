const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Example protected route
router.get('/dashboard', authMiddleware, (req, res) => {
  res.send(`Welcome Admin ${req.admin.email}, this is your dashboard.`);
});

module.exports = router;
