import { apiSlice } from "../api/apiSlice";

export const subjectCategory = apiSlice.injectEndpoints({
          endpoints:(builder)=>({
                getSubjectCategories: builder.query({
                      query: ()=> '/eduScholar-administration/dashboard/admin/subject_category'
                })
          })
})

export const {useGetSubjectCategoriesQuery} = subjectCategory;