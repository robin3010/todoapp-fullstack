import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export interface Todo {
  id: number
  title: string
  completed: boolean
  userId: string
}

export interface User {
  id: string
  username: string
  accessToken: string
  refreshToken: string
}

export interface Credentials { username: string, password: string }

export type TokensPair = Pick<User, 'accessToken' | 'refreshToken'>

export interface LocationState { from?: string }

export function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

export function isErrorWithMessage(
  error: unknown,
): error is { message: string } {
  return (
    typeof error === 'object'
    && error != null
    && 'message' in error
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    && typeof (error as any).message === 'string'
  )
}
