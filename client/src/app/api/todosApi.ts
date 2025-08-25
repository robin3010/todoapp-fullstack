import { createApi } from '@reduxjs/toolkit/query/react'
import type { Todo } from '../../shared/types/types'
import { axiosBaseQuery } from './baseQuery'

export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:3000/api/v1/todos' }),
  endpoints: build => ({
    getAllTodos: build.query<Todo[], void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
    }),

    addTodo: build.mutation<Todo, Pick<Todo, 'title'>>({
      query: body => ({
        url: '',
        method: 'POST',
        data: body,
      }),
    }),

    editTodo: build.mutation<Todo, number>({
      query: id => ({
        url: `/${id}`,
        method: 'PUT',
      }),
    }),

    deleteTodo: build.mutation({
      query: (id: string) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})
