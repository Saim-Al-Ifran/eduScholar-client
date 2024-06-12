import { apiSlice } from "../../api/apiSlice";
import Cookies from 'js-cookie';

const adminAuthApi = apiSlice.injectEndpoints({
      endpoints:(builder)=>({
             adminLogin: builder.mutation({
                    query:(data)=>({
                         url:'/eduScholar-administration/login',
                         method:'POST',
                         body:data
                    })
             })
      })
})

export const {useAdminLoginMutation} = adminAuthApi;