import React,{useEffect,useState} from 'react';
import foodItems from '../fooditems';
import Food from '../components/Food';
import { use } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { getAllFoodItems } from '../actions/fooditemActions';

const Home = () => {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getAllFoodItems())

    
  },[]);

  return (
    <div className="pt-28 sm:pt-24 md:pt-0 lg:pt-8 xl:pt-0">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          {foodItems.map((food, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
            <Food food={food} />
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;