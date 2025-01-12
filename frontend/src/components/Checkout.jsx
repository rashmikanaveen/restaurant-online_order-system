import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from 'react-redux';
import {placeOrder} from '../actions/orderActions'
const Checkout = ({ total }) => {


    const dispatch = useDispatch();
  const onToken = (token) => {
    // Handle the token received from Stripe
    console.log(token);
    dispatch(placeOrder(token,total));
  };

  return (
    <div>
      <StripeCheckout
        amount={total * 100} // Amount in cents
        shippingAddress
        billingAddress // Enable billing address
        token={onToken}
        stripeKey='pk_test_51QgD9AFmxOub4XevqU9VNYIjbFMLsdB02mC98BOBijqNpZBTaeXSyvvE99sUFOUCqFpnZqAmHwqlcBwp97hZueL500unN3WQVU' // Replace with your actual publishable key
        currency="LKR" // Set currency to Sri Lankan Rupees
        name="Your Company Name"
        description={`Your total is ${total} LKR`}
        panelLabel="Pay Now"
      >
        <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
          Check out
        </button>
      </StripeCheckout>
    </div>
  );
};

export default Checkout;