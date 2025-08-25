import {
  createSlice,
  type CaseReducer,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { TokensPair, User } from '../../../shared/types/types'
import { getInitialState } from '../initState'

// const initialState = {} as User

type AuthSliceReducer<U> = CaseReducer<User, PayloadAction<U>>

const saveUser: AuthSliceReducer<User> = (state, { payload }) => (state = payload)

const updateTokens: AuthSliceReducer<TokensPair> = (state, { payload }) => (state = { ...state, ...payload })

const clearUser = () => getInitialState().auth

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: getInitialState().auth,
  reducers: {
    saveUser,
    updateTokens,
    clearUser,
  },
})

export const { actions: authActions, reducer: authReducer } = authSlice
