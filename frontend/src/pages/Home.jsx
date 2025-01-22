import React, { useEffect, useState } from "react";

import Food from "../components/Food";
import { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFoodItems } from "../actions/fooditemActions";
import Loading from "../components/Loading";
import Error from "../components/Error";

import Footer from "../components/Footer";

import Cookies from "js-cookie";
import { getCategories } from "../actions/categoryActions";

const Home = () => {
  const [FoodItems, setFoodItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [timeElapsed, setTimeElapsed] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  

  const dispatch = useDispatch();
  const categoryState = useSelector((state) => state.categoryReducer);
  const {
    loading: categoryLoading,
    categoryerror,
    categories,
    success,
  } = categoryState;

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

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (FoodItems === null || !FoodItems) {
    return (
      <div className="pt-28 sm:pt-24 md:pt-0 lg:pt-8 xl:pt-0 mt-16">
        {timeElapsed ? (
          <Error error="Connection lost. Please refresh again!" />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
  const totalItems = Number(FoodItems.length);
  const totalPages = Number(Math.ceil(totalItems / itemsPerPage));

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    
    pageNumbers.push(
      <li
        key={1}
        className={`flex items-center justify-center cursor-pointer text-base font-bold px-3 h-9 rounded-md ${
          currentPage === 1 ? 'bg-blue-500 text-white border-blue-500' : 'hover:bg-gray-50 border-2 text-gray-800'
        }`}
        onClick={() => handlePageClick(1)}
      >
        1
      </li>
    );
  
    
    if (currentPage > 2) {
      pageNumbers.push(<li key="ellipsis1" className="flex items-center justify-center px-1 mx-0 h-9">..</li>);
    }
  
    
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageNumbers.push(
        <li
          key={currentPage}
          className={`flex items-center justify-center cursor-pointer text-base font-bold px-3 h-9 rounded-md ${
            currentPage === currentPage ? 'bg-blue-500 text-white border-blue-500' : 'hover:bg-gray-50 border-2 text-gray-800'
          }`}
          onClick={() => handlePageClick(currentPage)}
        >
          {currentPage}
        </li>
      );
    }
  
    
    if (currentPage < totalPages - 1) {
      pageNumbers.push(<li key="ellipsis2" className="flex items-center justify-center px-1 h-9">..</li>);
    }
  
    
    pageNumbers.push(
      <li
        key={totalPages}
        className={`flex items-center justify-center cursor-pointer text-base font-bold px-3 h-9 rounded-md ${
          currentPage === totalPages ? 'bg-blue-500 text-white border-blue-500' : 'hover:bg-gray-50 border-2 text-gray-800'
        }`}
        onClick={() => handlePageClick(totalPages)}
      >
        {totalPages}
      </li>
    );
  
    return pageNumbers;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = FoodItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleButtonClick = () => {
    console.log(searchValue);
  };

  //console.log(currentItems);

  return (
    <div className="pt-28 sm:pt-24 md:pt-0 lg:pt-8 xl:pt-0 mt-6 lg:ml-52  xl:ml-52 ">
      <div className="container mx-auto px-4">
        <div className="">
          <nav id="sidebar" className="lg:min-w-[250px] w-max max-lg:min-w-8 ">
            <div
              id="sidebar-collapse-menu "
              className={`fixed top-0 left-0 h-screen bg-white transition-all duration-500    lg:pt-4 sm:mt-20 md:mt-18 xl:mt-0  lg:mt-0   mt-20    ${
                isSidebarOpen
                  ? "w-64"
                  : "bg-white shadow-lg h-screen fixed py-6 px-4 top-[70px] left-0 overflow-auto z-[99] lg:min-w-[250px] lg:w-max max-lg:w-0 max-lg:invisible transition-all duration-500"
              }`}
            >
              <ul className="space-y-2 ">
                <li>
                  <div className="flex rounded-md border-2 border-blue-500 overflow-hidden max-w-[14rem] mx-auto font-[sans-serif]">
                    <input
                      type="text"
                      onChange={handleInputChange}
                      placeholder="Search Something..."
                      className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
                    />
                    <button
                      onClick={handleButtonClick}
                      type="button"
                      className="flex items-center justify-center bg-[#007bff] px-5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 192.904 192.904"
                        width="16px"
                        className="fill-white"
                      >
                        <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
                      </svg>
                    </button>
                  </div>
                </li>
              </ul>

              <div className="mt-6">
                <h6 className="text-blue-600 text-sm font-bold px-4">
                  categories
                </h6>
                <ul className="mt-3 space-y-2">
                  {categories.map((category) => (
                    <li
                      key={category._id}
                      onClick={() => {
                        console.log(category.name);
                      }}
                      className="text-gray-800 text-sm flex items-center hover:bg-blue-300 rounded-md px-4 py-2 transition-all"
                    >
                      <label className="text-black text-sm">
                        {category.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
          <button
            id="toggle-sidebar"
            onClick={handleToggleSidebar}
            className="lg:hidden w-8 h-8 z-[100] fixed top-[74px] left-[10px] cursor-pointer flex items-center justify-center rounded-full outline-none transition-all duration-500"
          >
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap -mx-4">
          {currentItems.map((food) => (
            <div key={food._id} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-8">
              <Food food={food} />
            </div>
          ))}
        </div>
        <div>
          <ul className="flex space-x-5 justify-center font-[sans-serif] mb-8 w-full">
            <li
              className="flex items-center justify-center shrink-0 cursor-pointer text-base font-bold text-blue-600 h-9 rounded-md"
              onClick={handlePrevPage}
            >
              Prev
            </li>
            {renderPageNumbers()}
            <li
              className="flex items-center justify-center shrink-0 cursor-pointer text-base font-bold text-blue-600 h-9 rounded-md"
              onClick={handleNextPage}
            >
              Next
            </li>
          </ul>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
