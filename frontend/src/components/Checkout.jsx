import React, { useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch ,useSelector} from 'react-redux';
import {placeOrder} from '../actions/orderActions'
import Error from './Error';
import Success from './Success';
import Warning from './Warning';
import Loading from './Loading';

const Checkout = ({ total }) => {
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const { loading, error, success } = orderstate;


    const dispatch = useDispatch();
  const onToken = (token) => {
    // Handle the token received from Stripe
    //console.log(token);
    dispatch(placeOrder(token,total));
  };

  useEffect(() => {
    if (success) {
      
      const timer = setTimeout(() => {
        localStorage.removeItem('cartItems');
        
        dispatch({ type: 'CLEAR_CART' });
      }, 3000); 

      // Cleanup the timer if the component unmounts before the timer completes
      return () => clearTimeout(timer);
    }
  }, [success, dispatch]);

  return (
    <div>
      {loading && (<Loading/>)}
      {error && (<Error error='Something went wrong'/>)}
      {success && (<Success success='Your Order Placed Successfully'/>) }
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