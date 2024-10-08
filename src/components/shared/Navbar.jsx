import React, { useState } from 'react';
import { Button } from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import avatar from '../../../public/images/avatar/avatar.png';
import { userLoggedOut } from '../../features/auth/admin/authSlice';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { getAuth,signOut } from 'firebase/auth';
import app from '../../firebase/firebase.config';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);
  
  const getUser = useSelector(state => state.auth);
  console.log(getUser?.user); 

  const userName = getUser?.user?.displayName || getUser?.user?.name;
  const profileImage = getUser?.user?.photoURL || getUser?.user?.profilePicture || avatar;

  const isActive = (path) => {
    return location.pathname === path ? 'border-opacity-100 text-green-500' : 'border-opacity-0';
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const handleLogout = async() => {
    await signOut(auth);
    Cookies.remove('token');
    dispatch(userLoggedOut());
    toast.success("successfully logout");
    navigate('/');
  };


  return (
    <>
      <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-2 z-10">
        <div className="w-3/12 flex items-center">
          <Link to="/" className="flex items-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-500"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5z"
                fill="currentColor"
              />
              <path
                d="M2 17l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="ml-2 text-xl font-bold text-black duration-200">
              EduScholar
            </span>
          </Link>
        </div>
        <nav className="nav font-semibold text-lg hidden md:flex">
          <ul className="flex items-center">
            <li className={`p-4 border-b-2 border-green-500 duration-200 cursor-pointer ${isActive('/')}`}>
              <Link to="/"><i className="fa-solid fa-house-chimney mr-1"></i>Home</Link>
            </li>
            <li className={`p-4 border-b-2 border-green-500 duration-200 cursor-pointer ${isActive('/all_scholarship')}`}>
              <Link to="/all_scholarship"><i className="fa-solid fa-graduation-cap mr-1"></i>All Scholarship</Link>
            </li>
            {getUser.user && (
           <li className={`p-4 border-b-2 border-green-500 duration-200 cursor-pointer ${isActive('/my_applications')}`}>
           <Link to="/my_applications"><i class="fa-solid fa-envelope mr-1"></i>My Applications</Link>
         </li>
            )}
 
          </ul>
        </nav>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-green-500 focus:outline-none">
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
              ></path>
            </svg>
          </button>
        </div>
        <div className="hidden md:flex w-3/12 justify-end">
          {getUser.user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="User Avatar" title={getUser?.user?.name} src={profileImage} />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li><strong>{userName}</strong></li>
                <li onClick={handleLogout}><button>Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <Button color="green"><i className="fa-solid fa-user mr-1"></i>
                 Login
                 
              </Button>
            </Link>
          )}
        </div>
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md z-10">
            <ul className="flex flex-col items-center">
              <li className={`p-4 border-b-2 border-green-500 duration-200 cursor-pointer ${isActive('/')}`}>
                <Link to="/" onClick={toggleMenu}><i className="fa-solid fa-house-chimney mr-1"></i>Home</Link>
              </li>
              <li className={`p-4 border-b-2 border-green-500 duration-200 cursor-pointer ${isActive('/all_scholarship')}`}>
                <Link to="/all_scholarship" onClick={toggleMenu}><i className="fa-solid fa-graduation-cap mr-1"></i>All Scholarship</Link>
              </li>
              <li className={`p-4 border-b-2 border-green-500 duration-200 cursor-pointer ${isActive('/my_applications')}`}>
           <Link to="/my_applications"><i class="fa-solid fa-envelope mr-1"></i>My Applications</Link>
         </li>
              <li className="p-4 w-full text-center">
                {getUser.user ? (
                  <Button color="green" onClick={toggleMenu}><i className="fa-solid fa-user mr-1"></i>Profile</Button>
                ) : (
                  <Link to="/login" onClick={toggleMenu}>
                    <Button color="green"><i className="fa-solid fa-user mr-1"></i>Login</Button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
