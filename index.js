const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const mongoose = require('./db');
require('dotenv').config();

const { corsOptions, errorHandler } = require('./middleware');
const { Blog, Product, Order, User } = require('./model');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const blogRoutes = require('./blogRoutes');

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
  res.send('ECOMMERCE server is running!');
});

// Server listening
app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`);
});
