const express = require('express');
const router = express.Router();
const { Order } = require('./model');

// Define order routes...

// ALL ORDERS GET ROUTE
router.get('/allorders', async (req, res) => {
  try {
    const result = await Order.find();
    res.send(result);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// EDIT ORDER GET ROUTE
router.get('/allorders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Order.findById(id);
    res.send(result);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// FOR ADD ORDER POST ROUTE
router.post('/order', async (req, res) => {
  try {
    const order = new Order(req.body);
    const result = await order.save();
    res.send(result);
  } catch (error) {
    console.error('Error adding product:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// EDIT ORDER PATCH ROUTE
router.patch('/order/:id', async (req, res) => {
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




module.exports = router;
