export const addToCart = (food, quantity, varient) =>  {
  let cartItem = {
    name: food.name,
    _id: food._id,
    image: food.image,
    varient: varient,
    quantity: quantity,
    prices: food.prices,
    price: food.prices[varient] * quantity,
  };

  
  return {
    type: "ADD_TO_CART",
    payload: cartItem,
  };
};



