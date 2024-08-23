import { apiSlice } from '../api/apiSlice';

export const applicationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllApplication: builder.query({
            query: () => '/eduScholar-administration/dashboard/admin/applied_applications/',
            providesTags:['Applications']
        }),
        getSingleApplication: builder.query({
            query: (id) => `/eduScholar-administration/dashboard/admin/applied_applications/${id}`,
            providesTags:(result,error,id)=>[
                {type:'Application', id}
            ]
        }),
        applyForApplication: builder.mutation({
             query:({data})=>({
                  url:`/eduScholar-administration/dashboard/user/applications`,
                  method:'POST',
                  body:data
             })
        }),
        addFeedBack: builder.mutation({
            query: ({ id, data }) => ({
                url: `/eduScholar-administration/dashboard/admin/applied_applications/${id}/feedback`,
                method: 'PATCH',
                body: data,
            }),
           
        }),
        cancelApplication: builder.mutation({
            query: ({ id, data }) => ({
                url: `/eduScholar-administration/dashboard/admin/applied_applications/${id}/cancel`,
                method: 'PATCH',
                body: data,
            }),
           
        }),
        changeApplicationStatus: builder.mutation({
            query: ({ id, data }) => ({
                url: `/eduScholar-administration/dashboard/admin/applied_applications/${id}/status`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags:(result,error,{ id }) => [
                'Applications',
                 {type:'Application', id}
            ]    
            
        }),
        deleteApplication: builder.mutation({
            query: (id) => ({
                url: `/eduScholar-administration/dashboard/admin/applied_applications/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags:(result,error, id) => [
                'Applications',
                { type:'Application', id }
            ] 
        }),
    }),
     tagTypes: ['Applications','Application']
});

export const {
    useGetAllApplicationQuery,
    useGetSingleApplicationQuery,
    useAddFeedBackMutation,
    useCancelApplicationMutation,
    useChangeApplicationStatusMutation,
    useDeleteApplicationMutation,
    useApplyForApplicationMutation
} = applicationApi;
