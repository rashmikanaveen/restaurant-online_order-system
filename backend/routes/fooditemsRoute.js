const express = require('express');
const router = express.Router();

const fooditem = require('../models/Foodmodel'); // Ensure the correct file name and path

router.get('/getallfooditems', async (req, res) => {
    try {
        const fooditems = await fooditem.find({});
        res.send(fooditems);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;