const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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

const PORT = 5006;

// Middleware
app.use(cors({
  origin: '*',
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

// Basic route
app.get('/', (req, res) => {
  res.send('CampusX API Running');
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,         // These options are deprecated but harmless, you may remove them
  useUnifiedTopology: true
})
.then(async () => {
  console.log('MongoDB connected');

  // Create default admin if not exists
  const existingAdmin = await Admin.findOne({ email: 'admin@campusx.com' });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const newAdmin = new Admin({
      email: 'admin@campusx.com',
      password: hashedPassword
    });
    await newAdmin.save();
    console.log('✅ Default admin created: admin@campusx.com / admin123');
  } else {
    console.log('ℹ️ Default admin already exists');
  }

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error(err));

process.on('SIGINT', async () => {
  console.log('Server shutting down gracefully');
  await mongoose.connection.close(false);
  console.log('MongoDB connection closed');
  process.exit(0);
});
