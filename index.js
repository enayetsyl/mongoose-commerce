const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://mongoose-test:jQT7HZ8p0jtT7TD8@cluster0.ktgpsav.mongodb.net/?retryWrites=true&w=majority";
// CHANGE USER ID AND PASSWORD IN THE ABOVE URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'mongoosecom'  //CHANGE THE DB NAME HERE
})

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})


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
  const result = await Product.find();
  res.send(result);
});


// EDIT PRODUCT GET ROUTE
app.get('/api/v1/allproducts/:id', async (req, res) => {
  const id = req.params.id;
  const result = await Product.findById(id);
  res.send(result);
});

// ALL ORDERS GET ROUTE
app.get('/api/v1/allorders', async (req, res) => {
  const result = await Order.find();
  res.send(result);
});

// EDIT ORDER GET ROUTE
app.get('/api/v1/allorders/:id', async (req, res) => {
  const id = req.params.id;
  const result = await Order.findById(id);
  res.send(result);
});

// ALL BLOGS GET ROUTE
app.get('/api/v1/allblogs', async (req, res) => {
  const result = await Blog.find();
  res.send(result);
});

// EDIT BLOG GET ROUTE
app.get('/api/v1/allblogs/:id', async (req, res) => {
  const id = req.params.id;
  const result = await Blog.findById(id);
  res.send(result);
});

// POST ROUTES ------------

// FOR ADD PRODUCT POST ROUTE
app.post('/api/v1/addproduct', async (req, res) => {
  const product = new Product(req.body);
  const result = await product.save();
  res.send(result);
});

// FOR ADD ORDER POST ROUTE
app.post('/api/v1/order', async (req, res) => {
  const order = new Order(req.body);
  const result = await order.save();
  res.send(result);
});

// FOR ADD BLOG POST ROUTE
app.post('/api/v1/addblog', async (req, res) => {
  const blog = new Blog(req.body);
  const result = await blog.save();
  res.send(result);
});

// PATCH ROUTES ------------

// EDIT ORDER PATCH ROUTE
app.patch('/api/v1/order/:id', async (req, res) => {
  const id = req.params.id;
  const updatedOrderData = req.body;
  const result = await Order.findByIdAndUpdate(id, { $set: { status: updatedOrderData.status } }, { new: true });
  res.send(result);
});

// EDIT PRODUCT PATCH ROUTE
app.patch('/api/v1/allproducts/:id', async (req, res) => {
  const id = req.params.id;
  const updatedProductData = req.body;
  const result = await Product.findByIdAndUpdate(id, { $set: updatedProductData }, { new: true });
  res.send(result);
});

// EDIT BLOG PATCH ROUTE
app.patch('/api/v1/allblogs/:id', async (req, res) => {
  const id = req.params.id;
  const updatedBlog = req.body;
  const result = await Blog.findByIdAndUpdate(id, { $set: updatedBlog }, { new: true });
  res.send(result);
});

// DELETE ROUTES ------------

// FOR DELETE PRODUCT ROUTE
app.delete('/api/v1/allproduct/:id', async (req, res) => {
  const id = req.params.id;
  const result = await Product.findByIdAndDelete(id);
  res.send(result);
});

// FOR DELETE BLOG ROUTE
app.delete('/api/v1/allblogs/:id', async (req, res) => {
  const id = req.params.id;
  const result = await Blog.findByIdAndDelete(id);
  res.send(result);
});

// async function run() {
//   try {
//     // await client.connect();
//     // await client.db('admin').command({ ping: 1 });

//     const productCollection = client.db('mishbir').collection('products');
//     const orderCollection = client.db('mishbir').collection('orders');
//     const blogCollection = client.db('mishbir').collection('blogs');

//     // GET ROUTE------------

//     // FOR ALL PRODUCTS

//     app.get('/api/v1/allproducts', async (req, res) => {
//       const result = await productCollection.find().toArray();
//       res.send(result);
//     });

//     // EDIT PRODUCT GET ROUTE

//     app.get('/api/v1/allproducts/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await productCollection.findOne(query);
//       res.send(result);
//     });

//     // ALL ORDER GET ROUTE

//     app.get('/api/v1/allorders', async (req, res) => {
//       const result = await orderCollection.find().toArray();
//       res.send(result);
//     });

//     // EDIT ORDER GET ROUTE

//     app.get('/api/v1/allorders/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await orderCollection.findOne(query);
//       res.send(result);
//     });

//     // ALL BLOGS GET ROUTE

//     app.get('/api/v1/allblogs', async (req, res) => {
//       const result = await blogCollection.find().toArray();
//       res.send(result);
//     });

//     //  EDIT BLOG GET ROUTE

//     app.get('/api/v1/allblogs/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await blogCollection.findOne(query);
//       res.send(result);
//     });

//     //  POST ROUTE-----------

//     // FOR ADD PRODUCT POST ROUTE
//     app.post('/api/v1/addproduct', async (req, res) => {
//       const product = req.body;
//       console.log(product);
//       const result = await productCollection.insertOne(product);
//       res.send(result);
//     });

//     //  FOR ADD ORDER POST ROUTE
//     app.post('/api/v1/order', async (req, res) => {
//       const order = req.body;
//       const result = await orderCollection.insertOne(order);
//       res.send(result);
//     });

//     // FOR ADD BLOG POST ROUTE
//     app.post('/api/v1/addblog', async (req, res) => {
//       const blog = req.body;
//       const result = await blogCollection.insertOne(blog);
//       res.send(result);
//     });

//     // PATCH ROUTE--------------

//     // EDIT ORDER PATCH ROUTE
//     app.patch('/api/v1/order/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const updatedOrderData = req.body;
//       const updateDoc = {
//         $set: {
//           status: updatedOrderData.status,
//         },
//       };
//       const result = await orderCollection.updateOne(query, updateDoc);
//       res.send(result);
//     });

//     // EDIT PRODUCT PATCH ROUTE
//     app.patch('/api/v1/allproducts/:id', async (req, res) => {
//       const id = req.params.id;
//       const updatedProductData = req.body;
//       const query = { _id: new ObjectId(id) };
//       const updateDoc = {
//         $set: {
//           category: updatedProductData.category,
//           color: updatedProductData.color,
//           desc: updatedProductData.desc,
//           featured_image: updatedProductData.featured_image,
//           gallery_image: updatedProductData.gallery_image,
//           size: updatedProductData.size,
//           title: updatedProductData.title,
//           rprice: updatedProductData.rprice,
//           sprice: updatedProductData.sprice,
//         },
//       };
//       const result = await productCollection.updateOne(query, updateDoc);
//       res.send(result);
//     });

//     // EDIT BLOG PATCH ROUTE

//     app.patch('/api/v1/allblogs/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const updatedBlog = req.body;
//       const updateDoc = {
//         $set: {
//           blogTitle: updatedBlog.blogTitle,
//           blog: updatedBlog.blog,
//           featured_image: updatedBlog.featured_image,
//         },
//       };
//       const result = await blogCollection.updateOne(query, updateDoc);
//       res.send(result);
//     });

//     // DELETE ROUTE ------------------------

//     // FOR DELETE PRODUCT ROUTE
//     app.delete('/api/v1/allproduct/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await productCollection.deleteOne(query);
//       res.send(result);
//     });

//     // FOR DELETE BLOG ROUTE

//     app.delete('/api/v1/allblogs/:id', async (req, res) => {
//       const id = req.params.id;
//       const query = { _id: new ObjectId(id) };
//       const result = await blogCollection.deleteOne(query);
//       res.send(result);
//     });

//     // console.log(
//     //   'Pinged your deployment. You successfully connected to MongoDB!'
//     // );
//   } finally {
//     // await client.close();
//   }
// }
// run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('mishbir server is running');
});

app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`);
});
