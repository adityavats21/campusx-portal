const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();  // Initialize app

// Import routes
const aiRoutes = require('./routes/aiRoutes');
const eventRoutes = require('./routes/eventRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const adminRoutes = require('./routes/adminRoutes');
const studentRoutes = require('./routes/studentRoutes');

const Admin = require('./models/Admin');
const bcrypt = require('bcryptjs');

const PORT = process.env.PORT || 5006;
const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(',').map((origin) => origin.trim())
  : true;

// Middleware
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());

app.use(express.json());            // <--- JSON parser middleware BEFORE routes
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'CampusX API',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

app.get('/api', (req, res) => {
  res.send('CampusX API Running');
});

app.use('/api', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

app.use(express.static(clientBuildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

const seedDefaultAdmin = async () => {
  if (!process.env.DEFAULT_ADMIN_EMAIL || !process.env.DEFAULT_ADMIN_PASSWORD) return;

  const existingAdmin = await Admin.findOne({ email: process.env.DEFAULT_ADMIN_EMAIL });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);
    const newAdmin = new Admin({
      email: process.env.DEFAULT_ADMIN_EMAIL,
      password: hashedPassword
    });
    await newAdmin.save();
    console.log('Default admin created from environment variables');
  } else {
    console.log('Default admin already exists');
  }
};

const connectDatabase = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI is missing. App is running, but database-backed API routes will fail.');
    return;
  }

  if (!process.env.JWT_SECRET) {
    console.warn('JWT_SECRET is missing. Auth routes will fail until it is configured.');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log('MongoDB connected');
    await seedDefaultAdmin();
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
  }
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDatabase();
});

process.on('SIGINT', async () => {
  console.log('Server shutting down gracefully');
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close(false);
  }
  console.log('MongoDB connection closed');
  process.exit(0);
});
