import Reac, { useState } from "react";
import foodItems from "../fooditems";
import { Modal } from "react-bootstrap";
import CustomModal from "../Modals/CustomModal";


const Food = ({ food }) => {
  
  //console.log(food);
  const [quantity, setQuantity] = useState(1);
  const [varient, setVarient] = useState(food.varients[0]);

  //for modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="max-w-xs mx-auto p-2 bg-white shadow-2xl rounded-lg mt-6 ">
      <div onClick={handleShow}>
        <h1>{food.name}</h1>
        <img src={food.image} className="w-40 h-auto mx-auto" alt={food.name} />
      </div>
      <div className="flex justify-center mt-0 ">
        <div className="mr-2">
          <p className="font-semibold">varients</p>
          <select
            className="border border-gray-300 rounded p-2"
            value={varient}
            onChange={(e) => setVarient(e.target.value)}
          >
            {food.varients.map((varient, index) => (
              <option key={index} value={varient}>
                {varient}
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
            {[...Array(10).keys()].map((x, index) => {
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
            Price:-Rs. <strong>{food.prices[varient] * quantity}</strong>
          </h1>
        </div>
        <div className="ml-2">
          <button className="bg-red-500 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
      <CustomModal show={show} handleClose={handleClose} title={food.name}>
      <img src={food.image} className="w-full h-auto mx-auto" alt={food.name} />
      <p>{food.description}</p>
      </CustomModal>
      

      
    </div>
    
  );
};

export default Food;
