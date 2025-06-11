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
// 👇 TEMPORARY ROUTE to create a test admin (for development only)
router.post('/create-admin', async (req, res) => {
  const Admin = require('../models/Admin');
  
  const existing = await Admin.findOne({ email: 'admin@campusx.com' });
  if (existing) {
    return res.status(400).json({ message: 'Admin already exists' });
  }

  const admin = new Admin({
    email: 'admin@campusx.com',
    password: 'admin123' // We'll add hashing later
  });

  await admin.save();
  res.send('Test admin created: admin@campusx.com / admin123');
});

module.exports = router;
