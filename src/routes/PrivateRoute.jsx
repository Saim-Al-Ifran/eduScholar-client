 
import { Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = Cookies.get('token');
    const location = useLocation();

    if (isAuthenticated === null) {
        return   <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
       </div>
    }

    if (isAuthenticated) {
        return children;
    }

    return   <Navigate state={location.pathname} to="/login"></Navigate>;

    
};

export default PrivateRoute;