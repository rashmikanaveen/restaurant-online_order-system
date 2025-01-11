const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); 

router.post('/register', async (req, res) => {
    const { user } = req.body;
    const {name ,email,password}=user
    const newUser=new User({ name, email, password })
    //console.log(name)
    
    try{
        newUser.save()
        res.send("User Registered Successfully")

    }
    catch(error){
        return res.status(400).json({ message: error });

    }
       
});

module.exports = router;