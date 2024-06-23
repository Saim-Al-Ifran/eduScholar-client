import { apiSlice } from "../api/apiSlice";

export const dashboardStatsApi = apiSlice.injectEndpoints({
          endpoints:(builder)=>({
                getDashboardStats: builder.query({
                      query: ()=> '/eduScholar-administration/dashboard/admin/dashboard_statics/'
                })
          })
});

export const{useGetDashboardStatsQuery} = dashboardStatsApi;