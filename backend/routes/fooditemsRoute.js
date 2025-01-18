const express = require('express');
const router = express.Router();
const FoodItem = require('../models/Foodmodel'); 
const Category = require('../models/CategoryModel');

router.get('/getallfooditems', async (req, res) => {
    try {
        const fooditems = await FoodItem.find({});
        //console.log(fooditems); // Log the food items to the console
        res.json(fooditems); // Send the food items as JSON
    } catch (error) {
        console.error(error); // Log the error to the console
        return res.status(400).json({ message: error.message }); // Send the error message
    }
});

router.get('/getCategories', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.send(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;