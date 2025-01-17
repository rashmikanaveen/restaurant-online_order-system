import React, { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {addNewFoodItem} from "../actions/fooditemActions";
import Success from "../components/Success";
import Error from "../components/Error";
import Loading from "../components/Loading";

const AddNewFood = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [variants, setVariants] = useState([{ size: '', price: '' }]);

  const dispatch = useDispatch();
  const addfoodstate=useSelector(state=>state.addNewFoodItemReducer);
  const {loading,success,error}=addfoodstate;

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...variants];
    newVariants[index][field] = field === 'price' ? Number(value) : value;
    setVariants(newVariants);
  };

  const handleAddVariant = () => {
    setVariants([...variants, { size: '', price: '' }]);
  };

  const handleRemoveVariant = (index) => {
    const newVariants = variants.filter((_, i) => i !== index);
    setVariants(newVariants);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prices = variants.reduce((acc, variant) => {
      acc[variant.size] = Number(variant.price);
      return acc;
    }, {});
    const sizes = variants.map(variant => variant.size);
    const newFood = {
      name,
      description,
      prices,
      category,
      image,
      variants: sizes,
    };
    dispatch(addNewFoodItem(newFood));
    //console.log(newFood);
  };

  return (
    <div className="pt-4 mt-6 lg:ml-60 xl:ml-52 md:mt-12">
      <form onSubmit={handleSubmit} className="space-y-4 font-[sans-serif] text-[#333] max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Add New Food</h1>
        {loading && <Loading />}
        {error && <Error error={error} />}
        {success && <Success message="Food Added Successfully" />}
        <div className=" flex items-center">
          <input
            type="text"
            placeholder="Enter Food Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            required
          />
        </div>

        {variants.map((variant, index) => (
          <div key={index} className=" flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter Variant Size"
              value={variant.size}
              onChange={(e) => handleVariantChange(index, 'size', e.target.value)}
              className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              required
            />
            <input
              type="number"
              placeholder="Enter Price"
              value={variant.price}
              onChange={(e) => handleVariantChange(index, 'price', e.target.value)}
              className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
              required
            />
            <button type="button" onClick={() => handleRemoveVariant(index)} className="px-2 py-1 bg-red-500 text-white rounded">
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={handleAddVariant} className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Variant
        </button>

        <div className=" flex items-center">
          <input
            type="text"
            placeholder="Enter Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            required
          />
        </div>

        <div className=" flex items-center">
          <input
            type="text"
            placeholder="Enter Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            required
          />
        </div>

        <div className=" flex items-center">
          <textarea
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            required
          />
        </div>

        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
          Add Food
        </button>
      </form>
    </div>
  );
};

export default AddNewFood;