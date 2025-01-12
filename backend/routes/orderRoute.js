const express = require('express');
const router = express.Router();
const stripe = require('stripe')( process.env.STRIPE_SECRET );   
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
dotenv.config();

router.post('/placeorder', async (req, res) => {
    console.log(req.body);
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
            const order = {
                userId,
                name: token.card.name,
                email: token.email,
                orderItems: cartItems,
                orderAmount: total
            };
            res.send('Payment successful');
        } else {
            res.status(400).json({ message: 'Payment failed' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;