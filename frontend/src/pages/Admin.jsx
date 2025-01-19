import React, { useState } from "react";
import { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import AdminDashboard from "./adminDashboard";
import FoodsList from "./FoodsList";
import UsersList from "./UsersList";
import OrdersList from "./OrdersList";
import AddNewFood from "./AddNewFood";
import AddNewFoodCategory from "./AddNewFoodCategory";


const Admin = () => {
  const currentUser = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null;

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    
    <div>
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
            <li >
            
              
                <Link to="/admin/" className="text-gray-800 text-sm flex items-center hover:bg-blue-300 rounded-md px-4 py-2 transition-all">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-[18px] h-[18px] mr-3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M19.56 23.253H4.44a4.051 4.051 0 0 1-4.05-4.05v-9.115c0-1.317.648-2.56 1.728-3.315l7.56-5.292a4.062 4.062 0 0 1 4.644 0l7.56 5.292a4.056 4.056 0 0 1 1.728 3.315v9.115a4.051 4.051 0 0 1-4.05 4.05zM12 2.366a2.45 2.45 0 0 0-1.393.443l-7.56 5.292a2.433 2.433 0 0 0-1.037 1.987v9.115c0 1.34 1.09 2.43 2.43 2.43h15.12c1.34 0 2.43-1.09 2.43-2.43v-9.115c0-.788-.389-1.533-1.037-1.987l-7.56-5.292A2.438 2.438 0 0 0 12 2.377z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M16.32 23.253H7.68a.816.816 0 0 1-.81-.81v-5.4c0-2.83 2.3-5.13 5.13-5.13s5.13 2.3 5.13 5.13v5.4c0 .443-.367.81-.81.81zm-7.83-1.62h7.02v-4.59c0-1.933-1.577-3.51-3.51-3.51s-3.51 1.577-3.51 3.51z"
                      data-original="#000000"
                    ></path>
                  </svg>
                  Dashboard
                  </Link>
                  
                </li>
            </ul>


            <div className="mt-6">
              <h6 className="text-blue-600 text-sm font-bold px-4">
                Admin Actions
              </h6>
              <ul className="mt-3 space-y-2 ">
                <li >
                <Link to="/admin/users" className="text-gray-800 text-sm flex items-center hover:bg-blue-300 rounded-md px-4 py-2 transition-all">
                Users List      </Link>
                  
                </li>

                <li >
                <Link to="/admin/foodsList" className="text-gray-800 text-sm flex items-center hover:bg-blue-300 rounded-md px-4 py-2 transition-all">
                Food List</Link>
                  
                </li>

                <li >
                <Link to="/admin/addNewFood" className="text-gray-800 text-sm flex items-center hover:bg-blue-300 rounded-md px-4 py-2 transition-all">
                Add New Food</Link>
                  
                </li>
                <li>
                <Link to="/admin/orders"  className="text-gray-800 text-sm flex items-center hover:bg-blue-300 rounded-md px-4 py-2 transition-all">
                Orders List</Link>
                  
                </li>
                <li >
                <Link to="/admin/addNewFoodCategory" className="text-gray-800 text-sm flex items-center hover:bg-blue-300 rounded-md px-4 py-2 transition-all">
                Add New Food Category</Link>
                  
                </li>
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
        <div>
          <Routes>
          <Route path="" element={<AdminDashboard/>} />
          <Route path="users" element={<UsersList/>} />
            <Route path="foodsList" element={<FoodsList/>} />
            <Route path="users" element={<UsersList/>} />
            <Route path="orders" element={<OrdersList/>} />
            <Route path="addNewFood" element={<AddNewFood/>} />
            <Route path="addNewFoodCategory" element={<AddNewFoodCategory/>} />
          </Routes>
        </div>
      </div>
      {/* Main Content */}
      
    </div>
    
  );
};

export default Admin;
