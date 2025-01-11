export const addToCart = (food, quantity, variant) =>  {
  let cartItem = {
    name: food.name,
    _id: food._id,
    image: food.image,
    variant: variant,
    quantity: Number(quantity),
    prices: food.prices,
    price: food.prices[variant] * quantity,
  };

  if (quantity <= 0) {
    return (dispatch) => {
      alert("Quantity should be greater than 0");
    };
  }

  
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


