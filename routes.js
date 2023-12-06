// const express = require ('express');
// const { Blog, Product, Order, User } = require ('./model')

// const router = express.Router();

// // GET ROUTES ------------

// // // FOR ALL USERS

// // router.get('/allUsers', async(req, res) => {
// //   try{
// //     const result = await User.find()
// //     res.send(result)
// //   } catch (error){
// //     console.error('Error fetching users:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // })

// // // INDIVIDUAL USER GET ROUTE
// // router.get('/user', async(req, res) => {
// //   try{
// //     const userEmail = req.query.email;
// //     console.log(userEmail)
// //     const user = await User.findOne({email: userEmail})
// //     if (user){
// //       res.json(user)
// //     } else {
// //       res.status(404).json({ message: 'User not found'})
// //     }
// //   }
// //   catch(error){
// //     console.error('Error fetching user data:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // })

// // // FOR ALL PRODUCTS

// // router.get('/allproducts', async (req, res) => {
// //   try {
// //     const result = await Product.find();
// //     res.send(result);
// //   } catch (error) {
// //     console.error('Error fetching produts:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // // EDIT PRODUCT GET ROUTE
// // router.get('/allproducts/:id', async (req, res) => {
// //   try {
// //     const id = req.params.id;
// //     const result = await Product.findById(id);
// //     res.send(result);
// //   } catch (error) {
// //     console.error('Error fetching products:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // // ALL ORDERS GET ROUTE
// // router.get('/allorders', async (req, res) => {
// //   try {
// //     const result = await Order.find();
// //     res.send(result);
// //   } catch (error) {
// //     console.error('Error fetching products:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // // EDIT ORDER GET ROUTE
// // router.get('/allorders/:id', async (req, res) => {
// //   try {
// //     const id = req.params.id;
// //     const result = await Order.findById(id);
// //     res.send(result);
// //   } catch (error) {
// //     console.error('Error fetching products:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // // ALL BLOGS GET ROUTE
// // router.get('/allblogs', async (req, res) => {
// //   try {
// //     const result = await Blog.find();
// //     res.send(result);
// //   } catch (error) {
// //     console.error('Error fetching products:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // // EDIT BLOG GET ROUTE
// // router.get('/allblogs/:id', async (req, res) => {
// //   try {
// //     const id = req.params.id;
// //     const result = await Blog.findById(id);
// //     res.send(result);
// //   } catch (error) {
// //     console.error('Error fetching products:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // POST ROUTES ------------

// // // FOR ADD USER POST ROUTE
// // router.post('/user', async(req, res) => {
// //   try{
// //     const user = new User(req.body);
// //     const result = await user.save();
// //     res.send(result)
// //     console.log(user)
// //   }
// //   catch(error){
// //     console.error('Error adding user:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // })


// // // FOR ADD PRODUCT POST ROUTE
// // router.post('/addproduct', async (req, res) => {
// //   try {
// //     const product = new Product(req.body);
// //     console.log('req.body', product)
// //     const result = await product.save();
// //     console.log('result', result)
// //     res.send(result);
// //   } catch (error) {
// //     console.error('Error adding product:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // // FOR ADD ORDER POST ROUTE
// // router.post('/order', async (req, res) => {
// //   try {
// //     const order = new Order(req.body);
// //     const result = await order.save();
// //     res.send(result);
// //   } catch (error) {
// //     console.error('Error adding product:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // // FOR ADD BLOG POST ROUTE
// // router.post('/addblog', async (req, res) => {
// //   try {
// //     const blog = new Blog(req.body);
// //     const result = await blog.save();
// //     res.send(result);
// //   } catch (error) {
// //     console.error('Error adding product:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // PATCH ROUTES ------------

// // // MAKE ADMIN PATCH ROUTE
// // router.patch('/makeadmin/:id', async(req, res) => {
// //   const id = req.params.id;
// //   try{
// //     result = await User.findByIdAndUpdate(
// //       id,
// //       {
// //         $set: {
// //           role:'admin',
// //         }
// //       }, {new: true}
// //     ) 
// //     res.send(result)
// //   }catch(error){
// //     console.error('Error updating admin:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // })

// // // EDIT ORDER PATCH ROUTE
// // router.patch('/order/:id', async (req, res) => {
// //   const id = req.params.id;
// //   const updatedOrderData = req.body;
// //   try {
// //     const result = await Order.findByIdAndUpdate(
// //       id,
// //       { $set: { status: updatedOrderData.status } },
// //       { new: true }
// //     );
// //     res.send(result);
// //   } catch (error) {
// //     console.error('Error updating order:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // // EDIT PRODUCT PATCH ROUTE
// // router.patch('/allproducts/:id', async (req, res) => {
// //   const id = req.params.id;
// //   const updatedProductData = req.body;
// //   const result = await Product.findByIdAndUpdate(
// //     id,
// //     { $set: updatedProductData },
// //     { new: true }
// //   );
// //   res.send(result);
// // });

// // // EDIT BLOG PATCH ROUTE
// // router.patch('/allblogs/:id', async (req, res) => {
// //   const id = req.params.id;
// //   const updatedBlog = req.body;
// //   try {
// //     const result = await Blog.findByIdAndUpdate(
// //       id,
// //       { $set: updatedBlog },
// //       { new: true }
// //     );
// //     res.send(result);
// //   } catch (error) {
// //     console.error('Error deleting product:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // DELETE ROUTES ------------

// // // FOR DELETE USER ROUTE
// // router.delete('/userDelete/:id', async (req, res) => {
// //   const id = req.params.id;
// //   try{
// //     const result = await User.findByIdAndDelete(id);
// //     res.send(result)
// //   }catch (error){
// //     console.error('Error deleting user:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // })

// // // FOR DELETE PRODUCT ROUTE
// // router.delete('/allproduct/:id', async (req, res) => {
// //   const id = req.params.id;
// //   try {
// //     const result = await Product.findByIdAndDelete(id);
// //     res.send(result);
// //   } catch (error) {
// //     console.error('Error deleting product:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// // // FOR DELETE BLOG ROUTE
// // router.delete('/allblogs/:id', async (req, res) => {
// //   const id = req.params.id;
// //   try {
// //     const result = await Blog.findByIdAndDelete(id);
// //     res.send(result);
// //   } catch (error) {
// //     console.error('Error deleting product:', error.message);
// //     res.status(500).send('Internal Server Error');
// //   }
// // });

// module.exports = router;