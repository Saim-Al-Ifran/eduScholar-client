import { apiSlice } from "../../api/apiSlice";
import Cookies from 'js-cookie';
import { userLoggedIn, userLoggedOut } from "./authSlice";


const clearToken = (dispatch) => {
    Cookies.remove('token');
    dispatch(userLoggedOut());
};

const adminAuthApi = apiSlice.injectEndpoints({
      endpoints:(builder)=>({
             adminLogin: builder.mutation({
                    query:(data)=>({
                         url:'/eduScholar-administration/login',
                         method:'POST',
                         body:data
                    }),
                    async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                        try {
                            const result = await queryFulfilled;
                            const accessToken = result?.data?.token;
                            const expirationTime = new Date();
                            expirationTime.setTime(expirationTime.getTime() + 60 * 60 * 1000);                 
        
                            Cookies.set(
                                'token',
                                JSON.stringify({
                                    accessToken: accessToken,
                                    user: result?.data?.user,
                                }),
                                { expires: expirationTime }
                            );
        
                            dispatch(userLoggedIn({
                                accessToken:accessToken,
                                user:result?.data?.user
                            }))
        
                            setTimeout(() => {
                                clearToken(dispatch);
                                 
                            }, expirationTime.getTime() - Date.now());
        
                        } catch (err) {
                            console.log(err);
                        }
                    }
             }),
             
      })
})

export const {useAdminLoginMutation} = adminAuthApi;