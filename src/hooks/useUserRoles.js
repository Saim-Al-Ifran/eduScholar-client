import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const useUserRoles = () => {
    const [roles, setRoles] = useState({
            isAdmin: false,
            isModerator: false,
            isStudent:false
         });

    useEffect(() => {
        const tokenCookie = Cookies.get('token');
       
        if (tokenCookie) {
            try {
                const { accessToken } = JSON.parse(tokenCookie);
                const decodedToken = jwtDecode(accessToken);
                const role = decodedToken?.role; 

                setRoles({
                    isAdmin: role === 'admin',
                    isModerator: role === 'moderator',
                    isStudent:role ==='student'
                });
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, []);

    return roles;
};

export default useUserRoles;
