import Cookies from "js-cookie";
import React, { createContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  cartItems: JSON.parse(Cookies.get("cartItems") || "[]"),
};

export const cartReducer = (state = initialState, action) => {
  let updatedCartItems=[];
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x._id === item._id && x.varient === item.varient && item.quantity === item.quantity
      );
      if (existItem) {
        updatedCartItems = state.cartItems.map((x) =>
          x._id === existItem._id && x.varient === existItem.varient ? item : x
        );

      }else{
         updatedCartItems = [...state.cartItems, item];
      }
      
        Cookies.set("cartItems", JSON.stringify(updatedCartItems));
        console.log("Updated Cart Items:", updatedCartItems);
        return {
          ...state,
          cartItems: updatedCartItems,
        };

    default:
      return state;
  }
};




export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};


