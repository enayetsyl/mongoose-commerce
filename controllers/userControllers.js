const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill up all the fields!');
  }

  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    res.status(400);
    throw new Error('User already exists with this email!');
  }

  const newUser = await User.create({
    name,
    email,
    password,
    role: 'user',
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error('Failed to create new user from backend!');
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };
    res.json(userData);
    console.log(userData);
  } else {
    res.status(401);
    throw new Error('Invalid email or password!');
  }
});
module.exports = { registerUser, authUser };
