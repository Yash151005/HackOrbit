// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// ─────────────────────────────────────────────────────
// Initialize App
const app = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────────────
// Middleware
// Increase timeout for large AI tasks
app.use((req, res, next) => {
  req.setTimeout(120000); // 2 mins
  next();
});

// CORS for frontend on port 3000
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─────────────────────────────────────────────────────
// Serve Uploaded Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─────────────────────────────────────────────────────
// Routes
const uploadRoutes = require('./routes/upload');
const estimateRoutes = require('./routes/estimate');
app.use('/api/estimate', estimateRoutes);
app.use('/api/upload', require('./routes/upload'));

// ─────────────────────────────────────────────────────
// MongoDB Connection (if used)
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
}

// ─────────────────────────────────────────────────────
// Start Server
app.listen(PORT, () => {
  console.log(`🚀 AutoFix AI backend running at http://localhost:${PORT}`);
});
