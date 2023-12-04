const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Specify the allowed origins
const allowedOrigins = ['http://localhost:5173', 'https://yourdomain.com'];

// CHANGE THE ABOVE SECOND DOMAIN TO THE REAL DOMAIN OF THE CUSTOMER.

// CORS configuration with allowed origins
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the request origin is in the allowedOrigins array or if it's undefined (for non-browser requests)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ktgpsav.mongodb.net/?retryWrites=true&w=majority`;
// CHANGE USER ID AND PASSWORD IN THE ABOVE URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'mongoosecom', //CHANGE THE DB NAME HERE
});

const connection = mongoose.connection;

// Handle MongoDB connection errors
connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message);
  // You can customize the error handling here, such as logging, sending alerts, etc.
  // For now, let's exit the process to prevent the application from continuing with a broken connection.
  process.exit(1);
});

// Handle MongoDB disconnection
connection.on('disconnected', () => {
  console.warn('MongoDB disconnected. Reconnecting...');
  // Attempt reconnection after a short delay
  setTimeout(() => {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'mongoosecom', // CHANGE THE DB NAME HERE
    });
  }, 5000); // Adjust the delay as needed
});

connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

process.on('SIGINT', () => {
  connection.close(() => {
    console.log('MongoDB connection closed due to application termination!');
    process.exit(0);
  });
});

const productSchema = new mongoose.Schema({
  title: String,
  category: String,
  rprice: Number,
  sprice: Number,
  desc: String,
  featured_image: String,
  gallery_image: String,
  size: [String],
  color: [String],
});

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  division: String,
  address: String,
  shippingCost: Number,
  totalPrice: Number,
  paymentMethod: String,
  bkashNumber: String,
  bkashTrnID: String,
  productDetails: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      title: String,
      category: String,
      rprice: Number,
      sprice: Number,
      desc: String,
      featured_image: String,
      gallery_image: String,
      size: [String],
      color: [String],
      quantity: Number,
      choosenColor: String,
      choosenSize: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  status: String,
});

const blogSchema = new mongoose.Schema({
  blogTitle: String,
  blog: String,
  featured_image: String,
});

const Blog = mongoose.model('Blog', blogSchema);

const Product = mongoose.model('Product', productSchema);

const Order = mongoose.model('Order', orderSchema);

// GET ROUTES ------------

// FOR ALL PRODUCTS

app.get('/api/v1/allproducts', async (req, res) => {
  try {
    const result = await Product.find();
    res.send(result);
  } catch (error) {
    console.error('Error fetching produts:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// EDIT PRODUCT GET ROUTE
app.get('/api/v1/allproducts/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Product.findById(id);
    res.send(result);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// ALL ORDERS GET ROUTE
app.get('/api/v1/allorders', async (req, res) => {
  try {
    const result = await Order.find();
    res.send(result);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// EDIT ORDER GET ROUTE
app.get('/api/v1/allorders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Order.findById(id);
    res.send(result);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// ALL BLOGS GET ROUTE
app.get('/api/v1/allblogs', async (req, res) => {
  try {
    const result = await Blog.find();
    res.send(result);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// EDIT BLOG GET ROUTE
app.get('/api/v1/allblogs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Blog.findById(id);
    res.send(result);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// POST ROUTES ------------

// FOR ADD PRODUCT POST ROUTE
app.post('/api/v1/addproduct', async (req, res) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// FOR ADD ORDER POST ROUTE
app.post('/api/v1/order', async (req, res) => {
  try {
    const order = new Order(req.body);
    const result = await order.save();
    res.send(result);
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// FOR ADD BLOG POST ROUTE
app.post('/api/v1/addblog', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const result = await blog.save();
    res.send(result);
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// PATCH ROUTES ------------

// EDIT ORDER PATCH ROUTE
app.patch('/api/v1/order/:id', async (req, res) => {
  const id = req.params.id;
  const updatedOrderData = req.body;
  try {
    const result = await Order.findByIdAndUpdate(
      id,
      { $set: { status: updatedOrderData.status } },
      { new: true }
    );
    res.send(result);
  } catch (error) {
    console.error('Error updating order:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// EDIT PRODUCT PATCH ROUTE
app.patch('/api/v1/allproducts/:id', async (req, res) => {
  const id = req.params.id;
  const updatedProductData = req.body;
  const result = await Product.findByIdAndUpdate(
    id,
    { $set: updatedProductData },
    { new: true }
  );
  res.send(result);
});

// EDIT BLOG PATCH ROUTE
app.patch('/api/v1/allblogs/:id', async (req, res) => {
  const id = req.params.id;
  const updatedBlog = req.body;
  try {
    const result = await Blog.findByIdAndUpdate(
      id,
      { $set: updatedBlog },
      { new: true }
    );
    res.send(result);
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE ROUTES ------------

// FOR DELETE PRODUCT ROUTE
app.delete('/api/v1/allproduct/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Product.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// FOR DELETE BLOG ROUTE
app.delete('/api/v1/allblogs/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Blog.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.get('/', (req, res) => {
  res.send('ECOMMERCE server is running!');
});

app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`);
});
