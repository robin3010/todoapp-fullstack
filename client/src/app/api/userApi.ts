import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from './baseQuery'
import { API_PATHS } from '../../shared/consts'
import type { Credentials, TokensPair, User } from '../../shared/types/types'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    login: builder.mutation<User, Credentials>({
      query: body => ({
        url: API_PATHS.login,
        method: 'POST',
        data: body,
      }),
    }),
    register: builder.mutation<User, Credentials>({
      query: body => ({
        url: API_PATHS.register,
        method: 'POST',
        data: body,
      }),
    }),
    signOut: builder.mutation({
      query: () => ({
        url: API_PATHS.logout,
        method: 'POST',
      }),
    }),
    refreshTokens: builder.mutation<TokensPair, string>({
      query: refreshToken => ({
        url: API_PATHS.refresh,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }),
    }),
  }),
})
