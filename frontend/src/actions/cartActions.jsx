export const addToCart = (food, quantity, variant) =>  {
  let cartItem = {
    name: food.name,
    _id: food._id,
    image: food.image,
    variant: variant,
    quantity: quantity,
    prices: food.prices,
    price: food.prices[variant] * quantity,
  };

  
  return {
    type: "ADD_TO_CART",
    payload: cartItem,
  };
};


export const deleteFromCart = (food) =>dispatch=> {

  dispatch({
    type: "DELETE_FROM_CART",
    payload: food,
  });

}


