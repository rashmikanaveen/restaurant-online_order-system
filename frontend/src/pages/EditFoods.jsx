import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../actions/categoryActions";
import Success from "../components/Success";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { useParams, useNavigate } from "react-router-dom";
import { getAllFoodItems } from "../actions/fooditemActions"; // Import the action to fetch all food items

const EditFoods = () => {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [prices, setPrices] = useState([{ variant: "", price: "" }]);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  //const updateFoodState = useSelector(state => state.updateFoodItemReducer);
  //const { loading: updateLoading, success, error: updateError } = updateFoodState;

  const categoryState = useSelector((state) => state.categoryReducer);
  const {
    loading: categoryLoading,
    error: categoryError,
    categories,
  } = categoryState;

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
    dispatch(getCategories());
  }, [dispatch]);

  const currentFood = foodItems
    ? foodItems.find((food) => food._id === foodId)
    : null;

  useEffect(() => {
    if (currentFood) {
      setName(currentFood.name);
      setCategory(currentFood.category);
      setImage(currentFood.image);
      setDescription(currentFood.description);
      setPrices(
        Object.entries(currentFood.prices).map(([variant, price]) => ({
          variant,
          price,
        }))
      );
    }
  }, [currentFood]);

  const handlePriceChange = (index, field, value) => {
    const newPrices = [...prices];
    newPrices[index][field] =
      field === "price" ? (value === "" ? "" : Number(value)) : value;
    setPrices(newPrices);
  };

  const handleAddPrice = () => {
    setPrices([...prices, { variant: "", price: "" }]);
  };

  const handleRemovePrice = (index) => {
    const newPrices = prices.filter((_, i) => i !== index);
    setPrices(newPrices);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPrices = prices.reduce((acc, price) => {
      acc[price.variant] = Number(price.price);
      return acc;
    }, {});
    const updatedFood = {
      _id: foodId,
      name,
      description,
      prices: updatedPrices,
      category,
      image,
      variants: prices.map((price) => price.variant),
    };
    // Update food item (replace with your actual update logic)
    // dispatch(updateFoodItem(updatedFood));
    console.log(updatedFood);
  };

  if (!currentFood) {
    return (
      <div className="pt-4 mt-6 lg:ml-60 xl:ml-52 md:mt-12">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Food item not found
        </h1>
      </div>
    );
  }

  return (
    <div className="pt-4 mt-6 lg:ml-60 xl:ml-52 md:mt-12">
      {/*
            <div className=" flex  justify-center">
                            <img
                                src={image}
                                alt="Food"
                                className="w-10 h-10 object-cover rounded"
                            />
                        </div>
                         */}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 font-[sans-serif] text-[#333] max-w-md mx-auto"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Food Item
        </h1>
        {loading || categoryLoading ? (
          <Loading />
        ) : error || categoryError ? (
          <Error error={error || categoryError} />
        ) : (
          <>
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Enter Food Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
                required
              />
            </div>

            {prices.map((price, index) => (
              <div key={index} className="relative flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Enter Variant Size"
                  value={price.variant}
                  onChange={(e) =>
                    handlePriceChange(index, "variant", e.target.value)
                  }
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
                  required
                />
                <input
                  type="number"
                  placeholder="Enter Price"
                  value={price.price}
                  onChange={(e) =>
                    handlePriceChange(index, "price", e.target.value)
                  }
                  className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemovePrice(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddPrice}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Variant
            </button>

            <div className="relative flex items-center">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
                required
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Enter Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
                required
              />
            </div>

            <div className="relative flex items-center">
              <textarea
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="px-4 py-3 bg-[#f0f1f2] focus:bg-transparent w-full text-sm border outline-[#007bff] rounded transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Update Food
            </button>
            {/*
                        {updateLoading && <Loading />}
                        {updateError && <Error error={updateError} />}
                        {success && <Success message="Food item updated successfully" />}
                         */}
          </>
        )}
      </form>
    </div>
  );
};

export default EditFoods;
