import { apiSlice } from "../api/apiSlice";

export const degreeCategory = apiSlice.injectEndpoints({
          endpoints:(builder)=>({
                getDegreeCategories: builder.query({
                      query: ()=> '/eduScholar-administration/dashboard/admin/degree_category/'
                })
          })
});

export const { useGetDegreeCategoriesQuery } = degreeCategory;