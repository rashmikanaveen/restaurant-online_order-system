import React,{useEffect,useState} from 'react';

import Food from '../components/Food';
import { use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getAllFoodItems} from '../actions/fooditemActions';




const Home = () => {
  const [FoodItems, setFoodItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(false);


  useEffect(() => {
    // Start a timeout for 30 seconds
    const timer = setTimeout(() => {
      setTimeElapsed(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await getAllFoodItems();
        setFoodItems(response);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);
  
  if(FoodItems === null  || !FoodItems){
    return <div className="pt-28 sm:pt-24 md:pt-0 lg:pt-8 xl:pt-0 mt-16">
    {timeElapsed ? 'Connection lost. Please refresh again!' : 'Loading...'}
  </div>;
  }
  
  

  

  //console.log(FoodItems);
  
    return (
      <div className="pt-28 sm:pt-24 md:pt-0 lg:pt-8 xl:pt-0 mt-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            {FoodItems.map((food, index) => (
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