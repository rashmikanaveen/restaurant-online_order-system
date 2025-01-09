import React from 'react';

const Navbar = () => {
  return (
    <div>
      <nav className="bg-white border border-gray-200 fixed w-full z-20 top-0 start-0 shadow-lg">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="./src/assets/EatEase.webp" className="h-8" alt="EatEase Logo"/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap">EatEase</span>
          </a>
          
          <div className="items-center justify-between  w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-row p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <a href="#" className="block py-2 px-3 text-black rounded md:p-0 dark:text-black dark:border-gray-700">Login</a>
              </li>
              <li>
                <a href="#" className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-black dark:border-gray-700">Cart</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;