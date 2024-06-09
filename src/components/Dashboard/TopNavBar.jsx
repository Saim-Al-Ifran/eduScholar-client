import React from 'react';
import { FaBell, FaEnvelope, FaUserCircle } from 'react-icons/fa';

const TopNavBar = () => {
  return (
    <div className="bg-white shadow flex justify-between items-center px-4 py-2">
      <div className="text-xl font-semibold">Dashboard</div>
      <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" title="kodu" src="https://i.pinimg.com/736x/23/53/8e/23538eaeff8f59f795c8b5ab9df87aae.jpg"/>
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li ><strong>kodu</strong></li>
        <li   ><a>Logout</a></li>
      </ul>
    </div>
    </div>
  );
};

export default TopNavBar;
