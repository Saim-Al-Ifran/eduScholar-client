import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie';
import { userLoggedIn } from "../features/auth/admin/authSlice";

export default function useAuthCheck() {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);
 
    useEffect(() => {
        const cookieAuth = Cookies.get("token");
 
        if (cookieAuth) {
            const auth = JSON.parse(cookieAuth);
          
            if (auth?.accessToken && auth?.user) {
                dispatch(
                    userLoggedIn({
                        accessToken: auth.accessToken,
                        user: auth.user,
                    })
                );
            }
        }
        setAuthChecked(true);
    }, [dispatch, setAuthChecked]);

    return authChecked;
}