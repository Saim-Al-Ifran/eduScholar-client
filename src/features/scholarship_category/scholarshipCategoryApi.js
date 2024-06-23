import { apiSlice } from "../api/apiSlice";

export const scholarshipCategory = apiSlice.injectEndpoints({
          endpoints:(builder)=>({
                getScholarshipCategories: builder.query({
                      query:()=> '/eduScholar-administration/dashboard/admin/scholarship_category/'
                })
          })
})

export const { useGetScholarshipCategoriesQuery } = scholarshipCategory;