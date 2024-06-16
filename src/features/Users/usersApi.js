import { apiSlice } from "../api/apiSlice";

export const usersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => '/eduScholar-administration/dashboard/admin/users',
            providesTags: ['User']
        }),
        getSingleUser: builder.query({
            query: (id) => `/eduScholar-administration/dashboard/admin/users/${id}`,
            providesTags: (result, error, id) => [{ type: 'User', id }]
        }),
        updateUserRole: builder.mutation({
            query: ({ id, data }) => ({
                url: `/eduScholar-administration/dashboard/admin/users/${id}/role`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'User', id }]
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/eduScholar-administration/dashboard/admin/users/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [{ type: 'User', id }]
        })
    }),
    tagTypes: ['User']
});

export const {
    useGetAllUsersQuery,
    useGetSingleUserQuery,
    useUpdateUserRoleMutation,
    useDeleteUserMutation
} = usersApi;
