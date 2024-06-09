import React, { useState } from 'react';
import { FaTachometerAlt, FaProductHunt, FaList, FaTags, FaShoppingCart, FaUsers, FaCog, FaUserShield, FaBars } from 'react-icons/fa';
import { Collapse } from '@material-tailwind/react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:w-64 w-full bg-gray-800 text-white min-h-screen flex flex-col">
      <div className="flex items-center justify-between p-4 bg-gray-900 md:hidden">
        <h1 className="text-2xl font-bold">[Helsinki]</h1>
        <FaBars className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
      </div>
      <Collapse open={isOpen} className="md:hidden">
        <ul className="space-y-2">
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaTachometerAlt className="mr-2" /> Dashboard
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaProductHunt className="mr-2" /> Products
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaList className="mr-2" /> Categories
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaTags className="mr-2" /> Sub-Categories
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaShoppingCart className="mr-2" /> Orders
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaUsers className="mr-2" /> Users
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaCog className="mr-2" /> Options
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaUserShield className="mr-2" /> Role-Management
          </li>
        </ul>
      </Collapse>
      <div className="hidden md:block">
        <div className="p-4 flex items-center justify-center bg-gray-900">
          <h1 className="text-2xl font-bold">EduScholar</h1>
        </div>
        <ul className="mt-4 space-y-2">
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaTachometerAlt className="mr-2" /> Dashboard
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaProductHunt className="mr-2" />Manage Scholarships.
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaList className="mr-2" /> Manage Application
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaTags className="mr-2" /> All reviews
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaShoppingCart className="mr-2" /> Orders
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaCog className="mr-2" /> Messages
          </li>
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer">
            <FaUserShield className="mr-2" /> User-Management
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
