import { Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import useUserRoles from "../hooks/useIsAdmin";


const AdminOrModRoute = ({ children }) => {
    const { isAdmin, isModerator } = useUserRoles();
    const isAuthenticated = Cookies.get('token');
    const location = useLocation();

    if (isAuthenticated && isAdmin === false && isModerator === false   ) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    if (isAuthenticated && (isAdmin || isModerator)) {
        return children;
    }


    return   <Navigate state={location.pathname} to="/dashboard/login"></Navigate>;

    
};

export default AdminOrModRoute;