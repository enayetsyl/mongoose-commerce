const express = require('express');
const router = express.Router();
const { User } = require('./model');

// Define user routes...
// FOR ALL USERS

router.get('/allUsers', async(req, res) => {
  try{
    const result = await User.find()
    res.send(result)
  } catch (error){
    console.error('Error fetching users:', error.message);
    res.status(500).send('Internal Server Error');
  }
})

// INDIVIDUAL USER GET ROUTE
router.get('/user', async(req, res) => {
  try{
    const userEmail = req.query.email;
    console.log(userEmail)
    const user = await User.findOne({email: userEmail})
    if (user){
      res.json(user)
    } else {
      res.status(404).json({ message: 'User not found'})
    }
  }
  catch(error){
    console.error('Error fetching user data:', error.message);
    res.status(500).send('Internal Server Error');
  }
})

// FOR ADD USER POST ROUTE
router.post('/user', async(req, res) => {
  try{
    const user = new User(req.body);
    const result = await user.save();
    res.send(result)
    console.log(user)
  }
  catch(error){
    console.error('Error adding user:', error.message);
    res.status(500).send('Internal Server Error');
  }
})

// MAKE ADMIN PATCH ROUTE
router.patch('/makeadmin/:id', async(req, res) => {
  const id = req.params.id;
  try{
    result = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          role:'admin',
        }
      }, {new: true}
    ) 
    res.send(result)
  }catch(error){
    console.error('Error updating admin:', error.message);
    res.status(500).send('Internal Server Error');
  }
})

// FOR DELETE USER ROUTE
router.delete('/userDelete/:id', async (req, res) => {
  const id = req.params.id;
  try{
    const result = await User.findByIdAndDelete(id);
    res.send(result)
  }catch (error){
    console.error('Error deleting user:', error.message);
    res.status(500).send('Internal Server Error');
  }
})

module.exports = router;
