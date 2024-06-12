import { Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import useUserRoles from '../hooks/useUserRoles';
const AdminRoute = ({ children }) => {
    const isAuthenticated = Cookies.get('token');
    const location = useLocation();

    const {isAdmin} = useUserRoles();

    if (isAuthenticated === null) {
        return   <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
       </div>
    }

    if (isAuthenticated && isAdmin) {
        return children;
    }

    return   <Navigate state={location.pathname} to="/dashboard/login"></Navigate>;

    
};

export default AdminRoute;