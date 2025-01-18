const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const FoodItem = require('../models/Foodmodel'); 
const Category = require('../models/CategoryModel');

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

        console.log(newCategory)

        const savedCategory = await newCategory.save();
        res.send('New category added successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;