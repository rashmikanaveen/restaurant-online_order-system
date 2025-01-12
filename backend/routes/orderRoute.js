const express = require('express');
const router = express.Router();
const stripe = require('stripe')( process.env.STRIPE_SECRET );   
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
dotenv.config();
const Order = require('../models/orderModel');

router.post('/placeorder', async (req, res) => {
    //console.log(req.body);
    const { token, total, userId, cartItems } = req.body;
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });
        const payment = await stripe.charges.create({
            amount: total * 100,
            currency: 'LKR',
            customer: customer.id,
            receipt_email: token.email
        }, {
            idempotencyKey: uuidv4()
        });
        if (payment) {
            const newOrder = new Order({
                name: token.card.name,
                email: token.email,
                userid: userId,
                orderItems: cartItems,
                orderAmount: total,
                shippingAddress: {
                    street: token.card.address_line1,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postalCode: token.card.address_zip
                },
                transactionId: payment.source.id
            });
            await newOrder.save()
            res.send('Payment successful');
            console.log(newOrder)
        } else {
            res.status(400).json({ message: 'Payment failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});



router.get('/getUserOrders/:userid', async (req, res) => {
    const userid = req.params.userid;
    try {
        //console.log(userid)
        const orders = await Order.find({ userid: userid });
        //console.log(orders)
        res.send(orders);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});








module.exports = router;