import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
    reducerPath:'UserApis',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:3000'
    }),
    tagTypes:["User"],
    endpoints:(builder) => ({
        login:builder.mutation({
            query:(data) => ({
                url:'/user/userlogin',
                method:'POST',
                body:data,
                credentials:'include'
            }),
            providesTags:["User"]
        }),
        register:builder.mutation({
            query:(data) => ({
                url:'/user/usersignup',
                method:"POST",
                body:data,
                credentials:'include'
            }),
            providesTags:["User"]
        })
    })
})


export const { useLoginMutation , useRegisterMutation } = api
export default api;

