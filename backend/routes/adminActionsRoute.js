const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const FoodItem = require('../models/Foodmodel'); 
const Category = require('../models/CategoryModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
router.post('/addnewfooditem', async (req, res) => {
    //console.log(req.body)
    //const { name, description, prices, category, image,variants } = req.body;
    //console.log( req.body)
    try {
        const newFoodItem = new FoodItem({
        name :req.body.name,
        variants:req.body.variants,
        description:req.body.description,
        prices:req.body.prices,
        category:  req.body.category,
        image:req.body.image
        
        });
        
        //console.log(newFoodItem)
        const savedFoodItem = await newFoodItem.save();
        //console.log(savedFoodItem)
        res.send('New food item added successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


router.post('/addCategory', async (req, res) => {
    try {
        const newCategory = new Category({
            name: req.body.name
        });

        //console.log(newCategory)

        const savedCategory = await newCategory.save();
        res.send('New category added successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post ('/editfooditem/:id', async (req, res) => {


    try {
        const foodItem = await FoodItem.findById(req.params.id);
        if (foodItem) {
            foodItem.name = req.body.name;
            foodItem.variants = req.body.variants;
            foodItem.description = req.body.description;
            foodItem.prices = req.body.prices;
            foodItem.category = req.body.category;
            foodItem.image = req.body.image;

            //console.log(foodItem)
            const updatedFoodItem = await foodItem.save();
            res.send('Food item updated successfully');
        } else {
            res.status(404).json({ message: 'Food item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete('/deletefooditem/:id', async (req, res) => {
    try {
        const food= await FoodItem.findById(req.params.id);
        if(food){
            const foodItem = await FoodItem.findByIdAndDelete(req.params.id);
            res.send('Food item deleted successfully');
        }
        
    } catch (error) {
        console.error('Error deleting food item:', error);
        res.status(500).json({ message: error.message });
    }
});


router.get('/getAllOrders', async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ createdAt: -1 });
        //console.log(orders);
        res.send(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/updateOrderStatus/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        //console.log(order);
        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();

            const updatedOrder = await order.save();
            res.send('Order status updated successfully');
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})  

router.get('/getAllUsers', async (req, res) => {
    
    try {
        const users = await User.find({ isAdmin: false }).select('createdAt email name _id');
        //console.log(users);
        res.send(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/deleteuser/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.findByIdAndDelete(req.params.id);
            //console.log(user)await FoodItem.findByIdAndDelete(req.params.id);
            res.send('User deleted successfully');
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


router.get('/getNumberOfFoodOrdersGivenUser/:id', async (req, res) => {
    try {
      const userId = req.params.id;
      const orders = await Order.countDocuments({ userid: userId });
      
      //console.log(orders);
      res.json(orders);
    } catch (error) {
      console.error('Error getting number of food orders:', error); // Log the error for debugging
      res.status(500).json({ message: error.message });
    }
  });
  

  router.get('/getOrderByOrderId/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        console.log(order);
        res.send(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



module.exports = router;