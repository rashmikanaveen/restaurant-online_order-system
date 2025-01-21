import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../actions/categoryActions";
const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const currentUser = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null;

  const dispatch = useDispatch();

  const categoryState = useSelector((state) => state.categoryReducer);
  const { loading, error, categories, success } = categoryState;

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  //console.log(categories);
  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleButtonClick = () => {
    console.log(searchValue);
  };

  return (
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
            <h6 className="text-blue-600 text-sm font-bold px-4">categories</h6>
            <ul className="mt-3 space-y-2">
              
              {categories.map((category) => (
                
                <li key={category._id} 
                //onClick={() => {console.log(category.name)}}
                className="text-gray-800 text-sm flex items-center hover:bg-blue-300 rounded-md px-4 py-2 transition-all">
                <label  className="text-black text-sm">
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
  );
};

export default Sidebar;
