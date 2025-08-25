export const ROUTE_PATHS = {
  login: '/login',
  register: '/register',
  todos: '/todos',
} as const

export const API_PATHS = {
  login: '/login',
  logout: '/logout',
  register: '/register',
  todos: '/todos',
  refresh: '/refresh',
} as const

export const RTK_KEY = 'stored_data'

export const API_BASE_URL = 'http://localhost:3000/api/v1'
