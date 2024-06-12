import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

   
const useIsAdmin = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    
    useEffect(() => {
        const tokenCookie = Cookies.get('token');
       
        if (tokenCookie) {
            try {
                const { accessToken } = JSON.parse(tokenCookie);
                const decodedToken = jwtDecode(accessToken);
                console.log(decodedToken);
                const role = decodedToken?.role; 
                setIsAdmin(role === 'admin');
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    return isAdmin;
};

export default useIsAdmin;
