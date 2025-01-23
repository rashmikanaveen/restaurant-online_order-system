import React, { useState } from "react";

import { Modal } from "react-bootstrap";
import CustomModal from "../Modals/CustomModal";
import { useDispatch,useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import Loading from "./Loading";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const Food = ({ food }) => {
  
  if (!food) {
    return <Loading/>}
  
  //console.log(food);
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(food.variants[0]);

  //for modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleAddToCart = () => {
    dispatch(addToCart(food,quantity,variant));
  };

  const handleLogInClick = () => {
    navigate("/Login");
  };

  const currentUser = Cookies.get("userInfo")
      ? JSON.parse(Cookies.get("userInfo"))
      : null;



  return (
    <div className="max-w-xs mx-auto p-2 bg-white shadow-2xl rounded-lg mt-6 ">
      <div onClick={handleShow}>
        <h1>{food.name}</h1>
        <img src={food.image} className="w-full h-60 object-cover mt-4" alt={food.name} />
      </div>
      <div className="flex justify-center mt-0 ">
        <div className="mr-2">
          <p className="font-semibold">variants</p>
          <select
            className="border border-gray-300 rounded p-2"
            value={variant}
            onChange={(e) => {setVariant(e.target.value),setQuantity(1)}}
            
          >
            {food.variants.map((variant, index) => (
              <option key={index} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </div>

        <div className="ml-2">
          <p className="font-semibold">Quantity</p>
          <select
            className="border border-gray-300 rounded p-2"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            
          >
            {[...Array(30).keys()].map((x, index) => {
              return (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              );
            })}
          </select>
          
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <div className="mr-2 mt-1.5">
          <h1>
            Price:-Rs. <strong>{food.prices[variant] * quantity}</strong>
          </h1>
        </div>
        <div className="ml-2">
          <button className="bg-red-500 text-white font-bold py-2 px-4 rounded"
          onClick={currentUser ?handleAddToCart:handleLogInClick}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <CustomModal show={show} handleClose={handleClose} title={food.name}>
      <img src={food.image} className="w-72 h-72 object-cover mx-auto " alt={food.name} />
      <p>{food.description}</p>
      </CustomModal>
      

      
    </div>
    
  );
};

export default Food;
