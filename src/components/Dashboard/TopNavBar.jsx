import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { userLoggedOut } from '../../features/auth/admin/authSlice';
import toast from 'react-hot-toast';
import useUserRoles from '../../hooks/useIsAdmin';
 

const TopNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAdmin,isModerator,isStudent} = useUserRoles()
  const handleLogout = () => {
    if(isAdmin || isModerator){
      Cookies.remove('token');
      dispatch(userLoggedOut());
      toast.success("successfully logout");
      navigate('/dashboard/login');
    }
    if((isStudent)){
      Cookies.remove('token');
      dispatch(userLoggedOut());
      toast.success("successfully logout");
      navigate('/');
    }
 

  };

  return (
    <div className="bg-white shadow flex justify-between items-center px-4 py-2">
      <div className="text-xl font-semibold">Dashboard</div>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="User Avatar" title="kodu" src="https://i.pinimg.com/736x/23/53/8e/23538eaeff8f59f795c8b5ab9df87aae.jpg" />
          </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li><strong>kodu</strong></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </div>
    </div>
  );
};

export default TopNavBar;

