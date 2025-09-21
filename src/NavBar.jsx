import React from 'react';
import AgriSenseIcon from './../public/leaf-svgrepo-com.svg';

function Navbar() {
  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20">
    <nav className="bg-gray-100 border-2 border-emerald-500 shadow-md p-3 flex justify-between items-center relative rounded-2xl overflow-hidden mt-2 ">
      {/* Logo and icon */}
      <div className="flex items-center space-x-2">
        <img src={AgriSenseIcon} alt="AgriSense logo" className="h-6 w-6 animate-pop-up " /> 
        <span className="text-xl font-bold text-emerald-600">AgriSense</span>
      </div>
      {/* Navigation Links */}
      <div className="flex space-x-12">
        <a href="#" className="text-gray-600 hover:text-emerald-500 transition duration-300">
          Home
        </a>
        <a href="#" className="text-gray-600 hover:text-emerald-500 transition duration-300">
          About
        </a>
        <a href="#" className="text-gray-600 hover:text-emerald-500 transition duration-300">
          Services
        </a>
      </div>
    </nav>
    </div>
  );
}

export default Navbar;