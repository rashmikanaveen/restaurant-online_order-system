import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {userLogout} from '../actions/userActions'
import { useDispatch } from "react-redux";

const Navbar = () => {
  const currentUser = Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null;
  //console.log(currentUser.name);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigate = useNavigate();
  const dispatchEvent=useDispatch();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/Cart");
  };

  const handleLogInClick = () => {
    navigate("/Login");
  };

  return (
    <div>
      <nav className="bg-white border border-gray-200 fixed w-full z-20 top-0 start-0 shadow-lg">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
            onClick={handleLogoClick}
          >
            <img
              src="./src/assets/EatEase.png"
              className="h-8"
              alt="EatEase Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              EatEase
            </span>
          </a>

          <div
            className="items-center justify-between  w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-row p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              {currentUser ? (
                <li>
                  
                  <div className="relative font-[sans-serif] w-max mx-auto pt-0 ">
                    <button
                      type="button"
                      id="dropdownToggle"
                      className="px-5 py-2.5 border border-gray-300 text-gray-800 text-sm outline-none bg-white hover:bg-gray-50"
                      onClick={toggleDropdown}
                    >
                      {currentUser.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 fill-gray-500 inline ml-3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                          clipRule="evenodd"
                          
                        />
                      </svg>
                    </button>

                    <ul
                      id="dropdownMenu"
                      className={`absolute ${dropdownOpen ? "block" : "hidden"} shadow-[0_8px_19px_-7px_rgba(6,81,237,0.2)] bg-white py-2 z-[1000] min-w-full w-max divide-y max-h-96 overflow-auto`}
                    >
                      <li className="py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer">
                        Orders
                      </li>
                      <li className="py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer"
                      onClick={()=>{dispatchEvent(userLogout())}}>
                        LogOut
                      </li>
                      
                    </ul>
                  </div>
                </li>
              ) : (
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-black rounded md:p-0 dark:text-black dark:border-gray-700"
                    onClick={handleLogInClick}
                  >
                    Login
                  </a>
                </li>
              )}

              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-black dark:border-gray-700"
                  onClick={handleCartClick}
                >
                  <div className="relative">
                    <CiShoppingCart size="2em" />
                    {cartItems.length > 0 && (
                      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {cartItems.length}
                      </span>
                    )}
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
