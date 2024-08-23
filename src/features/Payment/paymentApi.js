import { apiSlice } from '../api/apiSlice';

export const paymentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
          confirmPayment:builder.mutation({
            query:({data})=>({
                url:'/payment/confirm-payment',
                method:'POST',
                body:data
            })

          }),
          sayHiFromFirebase: builder.query({
               query:()=>'/payment/hi'
          })
    })
})


export const { useConfirmPaymentMutation,useSayHiFromFirebaseQuery } = paymentApi;