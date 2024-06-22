import { apiSlice } from '../api/apiSlice';

export const applicationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllApplication: builder.query({
            query: () => '/eduScholar-administration/dashboard/admin/applied_applications/',
            providesTags: (result, error, id) => [
                'Applications',
                { type: 'Applications', id }
            ],
        }),
        getSingleApplication: builder.query({
            query: (id) => `/eduScholar-administration/dashboard/admin/applied_applications/${id}`,
            providesTags: (result, error, id) => [{ type: 'Applications', id }],
        }),
        addFeedBack: builder.mutation({
            query: ({ id, data }) => ({
                url: `/eduScholar-administration/dashboard/admin/applied_applications/${id}/feedback`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Applications', id }],
        }),
        cancelApplication: builder.mutation({
            query: ({ id, data }) => ({
                url: `/eduScholar-administration/dashboard/admin/applied_applications/${id}/cancel`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Applications', id }],
        }),
        changeApplicationStatus: builder.mutation({
            query: ({ id, data }) => ({
                url: `/eduScholar-administration/dashboard/admin/applied_applications/${id}/status`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Applications', id }],
        }),
        deleteApplication: builder.mutation({
            query: (id) => ({
                url: `/eduScholar-administration/dashboard/admin/applied_applications/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Applications', id }],
        }),
    }),
     tagTypes: ['Applications']
});

export const {
    useGetAllApplicationQuery,
    useGetSingleApplicationQuery,
    useAddFeedBackMutation,
    useCancelApplicationMutation,
    useChangeApplicationStatusMutation,
    useDeleteApplicationMutation
} = applicationApi;
