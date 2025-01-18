import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, addCategory } from '../actions/categoryActions';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Success from '../components/Success';

const AddNewFoodCategory = () => {
  const [newCategory, setNewCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const categoryState = useSelector((state) => state.categoryReducer);
  const { loading, error, categories, success } = categoryState;

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (categories.some(category => category.name.toLowerCase() === newCategory.toLowerCase())) {
      setErrorMessage('Category already exists');
    } else {
      dispatch(addCategory(newCategory));
      setNewCategory('');
      setErrorMessage('');
    }
  };

  return (
    <div className="pt-4 mt-6 lg:ml-60 xl:ml-52 md:mt-12">
      
      {loading && <Loading />}
      {error && <Error error={error} />}
      {success && <Success message="Category added successfully" />}
      {errorMessage && <Error error={errorMessage} />}
      <div className="space-y-4 font-[sans-serif] text-[#333] max-w-md mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800">Add New Food Category</h1>
        <form onSubmit={handleAddCategory} className="relative flex items-center space-x-2">
          <input
            type="text"
            placeholder="Enter New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
            required
          />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
            Add Category
          </button>
        </form>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Existing Categories</h2>
          {Array.isArray(categories) && categories.length > 0 ? (
            <ul className="list-disc pl-5">
              {categories.map((category) => (
                <li key={category._id+category.name} className="text-sm text-gray-700">
                  {category.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-700">No categories available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNewFoodCategory;