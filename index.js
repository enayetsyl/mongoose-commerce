const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const mongoose = require('./db');
require('dotenv').config();

const { corsOptions, errorHandler } = require('./middlewares/middleware');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', blogRoutes);

// Error handling middleware
app.use(errorHandler);

// Home route
app.get('/', (req, res) => {
  res.send('tanstack scroll  server is running!');
});

// Server listening
app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`);
});
