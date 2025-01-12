import Cookies from "js-cookie";
import React, { createContext, useReducer } from 'react';

const CartContext = createContext();





const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
  });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };




const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
};

export const cartReducer = (state = initialState, action) => {
  let updatedCartItems = [];
  switch (action.type) {
    case 'ADD_TO_CART':
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x._id === item._id && x.variant === item.variant
      );

      if (existItem) {
        updatedCartItems = state.cartItems.map((x) =>
          x._id === existItem._id && x.variant === existItem.variant ? item : x
        );
      } else {
        updatedCartItems = [...state.cartItems, item];
      }

      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      return {
        ...state,
        cartItems: updatedCartItems,
      };



      case 'DELETE_FROM_CART':
        const item2 = action.payload;
        //console.log(item2);
        //console.log( action.payload.variant);
        updatedCartItems = state.cartItems.filter(
          (x) => x._id !== action.payload._id || x.variant !== action.payload.variant
        );
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return {
          ...state,
          cartItems: updatedCartItems,
        };


    default:
      return state;
  }
};


















// use when need to use cookies

//
//const initialState = {
//  cartItems: JSON.parse(Cookies.get("cartItems") || "[]"),
//};
//
//export const cartReducer = (state = initialState, action) => {
//  let updatedCartItems=[];
//  switch (action.type) {
//    case "ADD_TO_CART":
//      const item = action.payload;
//      const existItem = state.cartItems.find(
//        (x) => x._id === item._id && x.variant === item.variant && item.quantity === item.quantity
//      );
//      if (existItem) {
//        updatedCartItems = state.cartItems.map((x) =>
//          x._id === existItem._id && x.variant === existItem.variant ? item : x
//        );
//
//      }else{
//         updatedCartItems = [...state.cartItems, item];
//      }
//      
//        Cookies.set("cartItems", JSON.stringify(updatedCartItems));
//        console.log("Updated Cart Items:", updatedCartItems);
//        return {
//          ...state,
//          cartItems: updatedCartItems,
//        };
//
//    default:
//      return state;
//  }
//};
//
//
