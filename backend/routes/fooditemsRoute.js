const express = require('express');
const router = express.Router();
const FoodItem = require('../models/Foodmodel'); 

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

module.exports = router;