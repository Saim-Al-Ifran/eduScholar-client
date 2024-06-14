 
import { apiSlice } from '../api/apiSlice';

export const reviewsApi =  apiSlice.injectEndpoints({
        endpoints:(builder)=>({
                getReviews:builder.query({
                      query:()=> '/eduScholar-administration/dashboard/admin/reviews',
                      providesTags:['reviews']
                }),
                deleteReivew:builder.mutation({
                      query:(id)=>({
                            url:`/eduScholar-administration/dashboard/admin/reviews/${id}`,
                            method:'DELETE'
                      }),
                      invalidatesTags:['reviews']
                })
        }),
        tagTypes: ['reviews']
})

export const { useGetReviewsQuery, useDeleteReivewMutation} = reviewsApi;
