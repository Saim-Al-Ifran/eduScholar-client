import { Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import useUserRoles from '../hooks/useUserRoles';
const ModeratorRoute = ({ children }) => {
    const isAuthenticated = Cookies.get('token');
    const location = useLocation();

    const {isModerator} = useUserRoles();


    if (isAuthenticated &&  isModerator === false   ) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }  


    if (isAuthenticated && isModerator) {
        return children;
    }


    return   <Navigate state={location.pathname} to="/dashboard/login"></Navigate>;

    
};

export default ModeratorRoute;