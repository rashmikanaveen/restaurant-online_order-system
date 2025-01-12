import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteFromCart } from '../actions/cartActions';
import Checkout from '../components/Checkout';


const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  
  const total = subtotal ;

  return (
    <div className="pt-28 md:pt-0">
      <div className="h-screen  pt-12 pb-1">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 pt-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <ul className="flex flex-col space-y-4">
                {cartItems.map((item) => (
                  <li key={item._id+item.variant} className="flex flex-col sm:flex-row sm:justify-between items-center border p-4 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                      <img src={item.image} alt="product-image" className="w-20 h-20 object-cover rounded-lg" />
                      <div className="mt-4 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                        <p className="mt-1 text-lg text-gray-700">{item.variant}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <span
                          className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => dispatch(addToCart(item, Number(item.quantity) - 1, item.variant))}
                        >
                          {" "}
                          -{" "}
                        </span>
                        <input
                          className="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) => dispatch(addToCart(item, Number(e.target.value), item.variant))}
                        />
                        <span
                          className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => dispatch(addToCart(item, Number(item.quantity) + 1, item.variant))}
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                        <p className="text-sm sm:text-base text-balance">
                          {item.quantity} * {item.prices[item.variant]} = {item.price}
                        </p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-8 w-8 cursor-pointer duration-150 hover:text-red-500"
                          onClick={() => dispatch(deleteFromCart(item))}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {cartItems.length > 0 && (
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-2xl md:mt-0 md:w-1/3">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">Rs.{subtotal.toFixed(2)}</p>
              </div>
              
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div>
                  <p className="mb-1 text-lg font-bold">Rs.{total.toFixed(2)}</p>
                  <p className="text-sm text-gray-700">including VAT</p>
                </div>
              </div>
              <Checkout total={total} />

              {/*<button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                Check out
              </button>*/}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;