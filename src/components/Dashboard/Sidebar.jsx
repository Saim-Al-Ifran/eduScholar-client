import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import useUserRoles from '../../hooks/useIsAdmin';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  
  const { isAdmin, isModerator} = useUserRoles();
  console.log(isAdmin)
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed top-0 left-0 bg-gray-800 text-white h-full ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300 overflow-y-auto`}>
      <div className="flex flex-col items-center w-full h-full">
        <button onClick={toggleSidebar} className="mt-4 mb-8">
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
        <nav className="mt-8 w-full">
          <ul className="flex flex-col w-full">
            {(isAdmin || isModerator) && (
              <>
                <li className="p-4">
                  <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) => `block py-2.5 px-4 rounded transition-colors duration-300 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                  >
                    <i className="fa-solid fa-tachometer-alt mr-2"></i>
                    {isOpen && 'Dashboard Home'}
                  </NavLink>
                </li>
                <li className="p-4">
                  <NavLink
                    to="/dashboard/manage_scholarship"
                    className={({ isActive }) => `block py-2.5 px-4 rounded transition-colors duration-300 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                  >
                    <i className="fa-solid fa-book mr-2"></i>
                    {isOpen && 'Manage Scholarship'}
                  </NavLink>
                </li>
                <li className="p-4">
                  <NavLink
                    to="/dashboard/manage_application"
                    className={({ isActive }) => `block py-2.5 px-4 rounded transition-colors duration-300 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                  >
                    <i className="fa-solid fa-clipboard-list mr-2"></i>
                    {isOpen && 'Manage Application'}
                  </NavLink>
                </li>
                <li className="p-4">
                  <NavLink
                    to="/dashboard/all_reviews"
                    className={({ isActive }) => `block py-2.5 px-4 rounded transition-colors duration-300 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                  >
                    <i className="fa-solid fa-comments mr-2"></i>
                    {isOpen && 'All Reviews'}
                  </NavLink>
                </li>
              </>
            )}
            {isAdmin && (
              <li className="p-4">
                <NavLink
                  to="/dashboard/users"
                  className={({ isActive }) => `block py-2.5 px-4 rounded transition-colors duration-300 ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
                >
                  <i className="fa-solid fa-users mr-2"></i>
                  {isOpen && 'User Management'}
                </NavLink>
              </li>
            )}
 
 
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
