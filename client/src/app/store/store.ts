import { configureStore } from '@reduxjs/toolkit'
import { RTK_KEY } from '../../shared/consts'
import { authReducer } from './auth/authSlice'
import { todosReducer } from './todos/todosSlice'
import { userApi } from '../api/userApi'
import { todosApi } from '../api/todosApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
    [userApi.reducerPath]: userApi.reducer,
    [todosApi.reducerPath]: todosApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(userApi.middleware, todosApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

store.subscribe(() => localStorage.setItem(RTK_KEY, JSON.stringify(store.getState())))
