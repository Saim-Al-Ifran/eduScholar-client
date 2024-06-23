import { apiSlice } from "../api/apiSlice";

export const scholarshipApi = apiSlice.injectEndpoints({
          endpoints:(builder)=>({
                getAllScholarship: builder.query({
                      query:()=> '/eduScholar-administration/dashboard/admin/scholarships',
                      providesTags:['Scholarships']
                }),
                getSingleScholarship: builder.query({
                      query:(id)=> `/eduScholar-administration/dashboard/admin/scholarships/${id}`,
                      providesTags: (result,error,id)=>[
                        'Scholarships',
                        {type:'scholarship',id}
                      ]
                }),
                createScholarship: builder.mutation({
                      query:(data)=>({
                          url:'/eduScholar-administration/dashboard/admin/scholarships',
                          method:'POST',
                          body:data
                      }),
                      invalidatesTags:['Scholarships']
                }),
                updateScholarship: builder.mutation({
                      query:({id,data})=>({
                          url:`/eduScholar-administration/dashboard/admin/scholarships/${id}`,
                          method:'PUT',
                          body:data
                      }),
                      invalidatesTags: (result,error,{id})=>[
                        'Scholarships',
                        {type:'scholarship',id}
                      ]
                      
                }),
                deleteScholarship: builder.mutation({
                      query:(id)=>({
                          url:`/eduScholar-administration/dashboard/admin/scholarships/${id}`,
                          method:'DELETE',
 
                      }),
                      invalidatesTags:['Scholarships']
                })
          }),
          tagTypes: ['Scholarships','scholarship']
})

export const { 
    useGetAllScholarshipQuery,
    useGetSingleScholarshipQuery,
    useCreateScholarshipMutation,
    useUpdateScholarshipMutation,
    useDeleteScholarshipMutation
 } = scholarshipApi;