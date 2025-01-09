import React from 'react';
import foodItems from '../fooditems';
import Food from '../components/Food';

const Home = () => {
  return (
    <div className="pt-28 sm:pt-24 md:pt-20 lg:pt-16 xl:pt-12">
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