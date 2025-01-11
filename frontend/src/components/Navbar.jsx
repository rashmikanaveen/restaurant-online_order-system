import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };


  const handleCartClick = () => {
    navigate('/Cart');
  };

  const handleLogInClick = () => {
    navigate('/Login');
  }

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
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-black rounded md:p-0 dark:text-black dark:border-gray-700"
                  onClick={handleLogInClick}
                >
                  Login
                </a>
              </li>
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
