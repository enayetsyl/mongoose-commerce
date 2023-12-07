const express = require('express');
const { registerUser, authUser } = require('../controllers/userControllers');
const User = require('../models/userModel');

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.get('/', async (req, res) => {
  try {
    const result = await User.find();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error('Error fetching USERs:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// EDIT USER PATCH ROUTE
router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        role: 'admin',
      },
    },
    { new: true }
  );
  res.send(result);
});

// FOR DELETE USER ROUTE
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const result = await User.findByIdAndDelete(id);
      res.send(result);
    } catch (error) {
      console.error('Error deleting user:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;
