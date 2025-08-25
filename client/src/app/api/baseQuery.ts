import axiosInstance from './axios'
import type { AxiosError, AxiosRequestConfig } from 'axios'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

interface AxiosBaseQueryArgs {
  baseUrl?: string
}

interface AxiosQueryParams {
  url: string
  method?: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
  headers?: AxiosRequestConfig['headers']
}

interface AxiosQueryParamsExtend extends AxiosQueryParams {
  params?: object | URLSearchParams
  data?: string | object
}

export const axiosBaseQuery
  = (
    { baseUrl }: AxiosBaseQueryArgs = { baseUrl: 'http://localhost:3000/api/v1' },
  ): BaseQueryFn<AxiosQueryParamsExtend, unknown, unknown> =>
    async ({ url, method, data, params, headers }) => {
      console.log({ url, method, data, params, headers })

      try {
        const result = await axiosInstance({
          url: baseUrl + url,
          method,
          data,
          params,
          headers,
        })
        console.log({ result })

        return { data: result.data }
      }
      catch (axiosError) {
        const error = axiosError as AxiosError

        return {
          error: {
            status: error.response?.status ?? 500,
            data: error.response?.data ?? error.message,
          },
        }
      }
    }
