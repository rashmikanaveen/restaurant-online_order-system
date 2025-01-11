import React, { useContext } from "react";
import { useSelector,useDispatch } from "react-redux";
import { addToCart,deleteFromCart } from "../actions/cartActions";


const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);

  const dispatch = useDispatch();
  
  

  return (
    <div className="pt-28  md:pt-0  ">
      <body>
        <div class="h-screen pt-20 pt-12 pb-1">
          <h1 class="mb-10 text-center text-2xl font-bold">Cart Items </h1>
          <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 pt-0">
            <div class="rounded-lg md:w-2/3 ">
              {/* items--------------------*/}















              {cartItems.map((item) => {
                return <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-2xl sm:flex sm:justify-start h-40">
                <img
                  src={item.image}
                  alt="product-image"
                  class="w-full rounded-lg sm:w-40"
                />
                <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div class="mt-5 sm:mt-0">
                    <h2 class="text-lg font-bold text-gray-900">
                      {item.name}
                    </h2>
                    <p class="mt-1 text-lg text-gray-700">{item.variant}</p>
                  </div>
                  <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div class="flex items-center border-gray-100">
                      <span class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => dispatch(addToCart(item, item.quantity - 1, item.variant))}>
                        {" "}
                        -{" "}
                      </span>
                      <input
                        class="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="number"
                        value={item.quantity}
                        min="1"
                        max="10"
                      />
                      <span class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      onClick={() => dispatch(addToCart(item, item.quantity + 1, item.variant))}>
                        {" "}
                        +{" "}
                      </span>
                    </div>
                    <div class="flex items-center space-x-4">
                      <p class="text-balance">{item.quantity}*{item.prices[item.variant]} = {item.price}</p>

                      
                    </div>
                    <div >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-8 w-8 cursor-pointer duration-150 hover:text-red-500"
                        onClick={() => dispatch(deleteFromCart(item))}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>;
                
                
              })}
            </div>

            <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-2xl md:mt-0 md:w-1/3">
              <div class="mb-2 flex justify-between">
                <p class="text-gray-700">Subtotal</p>
                <p class="text-gray-700">$129.99</p>
              </div>

              <div class="flex justify-between">
                <p class="text-gray-700">Shipping</p>
                <p class="text-gray-700">$4.99</p>
              </div>

              <hr class="my-4" />
              <div class="flex justify-between">
                <p class="text-lg font-bold">Total</p>
                <div class="">
                  <p class="mb-1 text-lg font-bold">$134.98 USD</p>
                  <p class="text-sm text-gray-700">including VAT</p>
                </div>
              </div>

              <button class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
                Check out
              </button>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default Cart;
