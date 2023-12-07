const mongoose = require('../db');

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

const userSchema = new mongoose.Schema({
  email: String,
  role: String,
});
const Blog = mongoose.model('Blog', blogSchema);

const Product = mongoose.model('Product', productSchema);

const Order = mongoose.model('Order', orderSchema);

const User = mongoose.model('User', userSchema);

module.exports = { Blog, Product, Order, User };
