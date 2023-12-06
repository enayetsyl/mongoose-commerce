const express = require('express');
const router = express.Router();
const { Blog } = require('./model');

// Define blog routes...
// ALL BLOGS GET ROUTE
router.get('/allblogs', async (req, res) => {
  try {
    const result = await Blog.find();
    res.send(result);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// EDIT BLOG GET ROUTE
router.get('/allblogs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Blog.findById(id);
    res.send(result);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// FOR ADD BLOG POST ROUTE
router.post('/addblog', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    const result = await blog.save();
    res.send(result);
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// EDIT BLOG PATCH ROUTE
router.patch('/allblogs/:id', async (req, res) => {
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

// FOR DELETE BLOG ROUTE
router.delete('/allblogs/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Blog.findByIdAndDelete(id);
    res.send(result);
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
