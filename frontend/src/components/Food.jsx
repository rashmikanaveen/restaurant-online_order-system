import React from 'react';
import foodItems from '../fooditems';


const Food = ({food}) => {
  return (
    <div>
     <h1>{food.name}</h1>
     <img src={food.image}  className="w-full h-auto" alt={food.name}  />
     <div  className="flex justify-between mt-2">
      <div>
        <p className="font-semibold">varients</p>
        <ul>
            {food.varients.map((varient, index) => (
              <li key={index}>{varient}</li>
            ))}
          </ul>
      </div>
      <div>
        <p className="font-semibold">prices</p>
        <ul>
            {Object.entries(food.prices).map(([size, price], index) => (
              <li key={index}>{`${size}: $${price}`}</li>
            ))}
          </ul>
      </div>

     </div>
    </div>
  );
};

export default Food;