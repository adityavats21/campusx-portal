const Student = require('../models/student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email });
    if (student && (await student.matchPassword(password))) {
      res.json({
        _id: student._id,
        email: student.email,
        name: student.name,
        token: generateToken(student._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.registerStudent = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new Student({ name, email, password: hashedPassword });
    await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error during registration' });
  }
};