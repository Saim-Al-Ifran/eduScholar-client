import { Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import useUserRoles from "../hooks/useIsAdmin";


const AdminOrModRoute = ({ children }) => {
    const { isAdmin, isModerator,loading  } = useUserRoles();
    const isAuthenticated = Cookies.get('token');
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    if (!isAuthenticated || (!isAdmin && !isModerator)) {

        return  <Navigate state={location.pathname} to="/dashboard/login"></Navigate>;

    }
    return children;
    
};

export default AdminOrModRoute;